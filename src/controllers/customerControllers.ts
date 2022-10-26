import Claim from '../models/claims';
import { Request, Response } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import { UploadedFile } from 'express-fileupload';
import path, { dirname } from 'path';
import fs from 'fs';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import https from 'https';
import Template from '../models/templates';

cloudinary.config({
  cloud_name: 'me-retracto',
  api_key: '381613826999381',
  api_secret: 'zstNjnStRqq-2ATDWtK5_JJcPTI',
});

export const getClaims = async (req: Request, res: Response) => {
  try {
    const claims = await Claim.find();
    res.status(200).json(claims);
  } catch (error: any) {
    // TODO: Type error
    res.send('error');
  }
};

export const postPreviousCheckClaim =async (req: Request, res: Response) => {
  try {
    
    const {id} = req.params
    const { claimFields } = req.body
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    console.log('claimfields: ', claimFields)
    const {payment, ...claimData} = claimFields
    
    console.log('claimData: ', claimData)
    const template = await Template.findById({ _id: id });
    if (!template) return res.status(404).json({"error":"not found"});
    const newClaim: unknown = {
      templateType: template.name,
      templateInternalCode: template.internalCode,
      fileUrl: '-',
      fileUid: '-',
      revisionStatus: 'notChecked',
      claimFields: {
        ...claimData
      },
      payment: {
        status: 'notPaid',
        amount: template.price
      }
    }
    
    console.log('newClaim: ', newClaim)
    const claimCreated = await Claim.create(newClaim);

    res.status(201).send({ claimCreated });
  } catch (error) {
    res.status(404).json({error})
  }
}
export const postClaimRender = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;
  
  const template = await Template.findById({ _id: id });
  //TODO: send error when claim is not found
  if (!template) return res.status(404).json({"error":"not found"});

  const file = fs.createWriteStream(path.resolve(__dirname, 'temp.docx'));
  await getFile(file, template.fileUrl);

  const content = fs.readFileSync(
    path.resolve(__dirname, 'temp.docx'),
    'binary'
  );
  
  const zip = new PizZip(content);

  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });

  // Render the document (Replace {first_name} by John, {last_name} by Doe, ...)
  doc.render(body.claimFields);

  const buf: Buffer = doc.getZip().generate({
    type: 'nodebuffer',
    // compression: DEFLATE adds a compression step.
    // For a 50MB output document, expect 500ms additional CPU time
    compression: 'DEFLATE',
  });

  // buf is a nodejs Buffer, you can either write it to a file or res.send it with express for example.
  fs.writeFileSync(path.resolve(__dirname, 'output.docx'), buf);

  try {
    const claimUrl = await cloudinary.uploader.upload(path.resolve(__dirname, 'output.docx'), {resource_type: 'auto', folder: 'claims'} )
    const newClaimBody = {
      name: template.name,
      internalCode: template.internalCode,
      fileUrl: claimUrl.secure_url,
      fileUid: claimUrl.public_id,
      defendant: body.claimFields.defendantName,
      claimer: body.claimFields.claimerName,
      claimerEmail: body.claimFields.claimerEmail,
      payment: {
        amount: template.price,
      }
    }

    const newClaim = await Claim.create(newClaimBody);
    res.status(201).send({ newClaim });
  } catch (error) {
    res.json(error)
  }
};

export const transactionInfo = async (req: Request, res: Response) => {
  try {
    // console.log('REq: ', req.body.data.transaction.reference)
    const {reference, id, amount_in_cents, currency, status, payment_method_type} = req.body.data.transaction
    
    console.log('refrence: ',reference)
    const claim = await Claim.findById({_id:reference})
    if (!claim) return res.json({"error":"claim not fond"}) ;
  
    // const updatedClaim = await Claim.findByIdAndUpdate(reference,   { payment: {status, amount: amount_in_cents, currency, paymentMethod: payment_method_type, transactionId: id, }},
    //   {
    //     new: true,
    //   });
      
    
    res.status(200).send({})
    
    if(status === 'APPROVED') {
      console.log('TEMPLATEID: ', claim.claimFields)
      const template = await Template.findById({ _id: claim?.claimFields?.id });
      //TODO: send error when claim is not found
      if (!template) return res.status(404).json({"error":"not found"});

      const file = fs.createWriteStream(path.resolve(__dirname, 'temp.docx'));
      await getFile(file, template.fileUrl);

      const content = fs.readFileSync(
        path.resolve(__dirname, 'temp.docx'),
        'binary'
      );
      
      const zip = new PizZip(content);

      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
      });

      // Render the document (Replace {first_name} by John, {last_name} by Doe, ...)
      doc.render(claim?.claimFields);

      const buf: Buffer = doc.getZip().generate({
        type: 'nodebuffer',
        // compression: DEFLATE adds a compression step.
        // For a 50MB output document, expect 500ms additional CPU time
        compression: 'DEFLATE',
      });

      // buf is a nodejs Buffer, you can either write it to a file or res.send it with express for example.
      fs.writeFileSync(path.resolve(__dirname, 'output.docx'), buf);

      const claimUrl = await cloudinary.uploader.upload(path.resolve(__dirname, 'output.docx'), {resource_type: 'auto', folder: 'claims'} )

      console.log('claimURL: ', claimUrl)

      const updatedClaim = await Claim.findByIdAndUpdate(reference,   { fileUrl:claimUrl.secure_url, fileUid: claimUrl.public_id, transactionId: id, payment: {status, amount: amount_in_cents, currency, paymentMethod: payment_method_type, transactionId: id, }},
        {
          new: true,
        });
      
        console.log('UPDATEDCLAIM: ', updatedClaim)
    }
  } catch (error) {
    console.log('ERROR: ', error)
  }
}

export const getClaimByTransactionId = async (req: Request, res: Response) => {
  try {
    const { transactionId } = req.params
    console.log('tansactionId: ', transactionId)

    const claim = await Claim.find({transactionId});

    console.log('claim', claim)
    if (claim.length === 0) return res.status(404).json({"error":"claim not found"}) ;

    res.status(200).json({claim});
  } catch (error: any) {
    // TODO: Type error
    res.send('error');
  }
};

async function getFile(file: any, url: any) {
  return new Promise((resolve, reject) => {
    const req = https.get(url);
    req.on('response', (res) => {
      const stream = res.pipe(file);
      stream.on('finish', () => resolve(true));
    });
    req.on('error', (err: any) => {
      reject(err);
    });
  });
}

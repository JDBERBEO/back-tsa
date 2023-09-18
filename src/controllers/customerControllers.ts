import Claim from '../models/claims';
import { Request, Response } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import path from 'path';
import fs from 'fs';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import https from 'https';
import Template from '../models/templates';
import formatBytes from '../utils/formatBytes';
import { UploadedFile } from 'express-fileupload';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { newClaimAlert, downloadModels } = require('../utils/mailer');

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
    res.status(400).json({ error });
  }
};

export const postPreviousCheckClaim = async (req: Request, res: Response) => {
  try {
    let filesArray: any;
    const claimFields: any = {
      attachProofs: [],
    };
    // if (req.files) {
    //   filesArray = Object.entries(req.files).map((e) => e[1]);
    //   const bytesTotal = filesArray.reduce((accumulator: any, object: any) => {
    //     return accumulator + object.size;
    //   }, 0);

    //   if (bytesTotal > 10000000) {
    //     res.status(404).json({ error: 'file limit' });
    //   }
    //   const totalSize = formatBytes(bytesTotal);
    // } else {
    //   res.status(404).json({ error: 'error in files' });
    // }

    // for (let i = 0; i < filesArray.length; i++) {
    //   const file = filesArray[i];

    //   const newFile = file as UploadedFile;
    //   const newFileResp = await cloudinary.uploader.upload(
    //     newFile.tempFilePath,
    //     {
    //       resource_type: 'auto',
    //       folder: 'claims',
    //       public_id: newFile.name,
    //     }
    //   );
    //   if (newFileResp) {
    //     claimFields.attachProofs.push(newFileResp.secure_url);
    //   }
    // }

    const { id } = req.params;
    let splitted;

    const keys = Object.keys(req.body);

    for (let i = 0; i < keys.length; i++) {
      splitted = keys[i].split('.');
      claimFields[splitted[1]] = req.body[keys[i]];
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { payment, ...claimData } = claimFields;

    const template = await Template.findById({ _id: id });
    if (!template) return res.status(404).json({ error: 'not found' });
    const newClaim: unknown = {
      templateType: template.name,
      templateInternalCode: template.internalCode,
      fileUrl: '-',
      fileUid: '-',
      revisionStatus: 'notChecked',
      claimFields: {
        ...claimData,
      },
      payment: {
        status: 'notPaid',
        amount: template.price,
      },
    };

    const claimCreated = await Claim.create(newClaim);
    if (!claimCreated) res.status(400).json({ error: 'claim not created' });

    res.status(201).send({ claimCreated });
  } catch (error) {
    res.status(404).json({ error });
  }
};

export const updateClaimWithFile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const claim = await Claim.findById({ _id: id });
    // console.log('claim: ', claim);
    // console.log('request: ', req.files);

    let filesArray: any;
    // const claimFields: any = {
    //   attachProofs: [],
    // };
    if (req.files) {
      filesArray = Object.entries(req.files).map((e) => e[1]);
      const bytesTotal = filesArray.reduce((accumulator: any, object: any) => {
        return accumulator + object.size;
      }, 0);

      if (bytesTotal > 10000000) {
        res.status(404).json({ error: 'file limit' });
      }
      const totalSize = formatBytes(bytesTotal);
    } else {
      res.status(404).json({ error: 'error in files' });
    }
    for (let i = 0; i < filesArray.length; i++) {
      const file = filesArray[i];

      const newFile = file as UploadedFile;
      const newFileResp = await cloudinary.uploader.upload(
        newFile.tempFilePath,
        {
          resource_type: 'auto',
          folder: 'claims',
          public_id: newFile.name,
        }
      );
      if (newFileResp) {
        claim?.claimFields?.attachProofs.push(newFileResp.secure_url);
      }
    }
    const updatedClaim = await Claim.findByIdAndUpdate(
      { _id: id },
      { claimFields: claim?.claimFields }
    );
    return res.status(201).json({ status: 'claimCreated' });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export const transactionInfo = async (req: Request, res: Response) => {
  try {
    const {
      reference,
      id,
      amount_in_cents,
      currency,
      status,
      payment_method_type,
    } = req.body.data.transaction;

    const claim = await Claim.findById({ _id: reference });
    if (!claim) return res.status(400).json({ error: 'claim not found' });

    // res.status(200).send({});

    if (status === 'APPROVED') {
      const template = await Template.findById({ _id: claim?.claimFields?.id });
      if (!template)
        return res.status(404).json({ error: 'template not found' });

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

      doc.render(claim?.claimFields);

      const buf: Buffer = doc.getZip().generate({
        type: 'nodebuffer',
        compression: 'DEFLATE',
      });

      fs.writeFileSync(path.resolve(__dirname, 'output.docx'), buf);

      const claimUrl = await cloudinary.uploader.upload(
        path.resolve(__dirname, 'output.docx'),
        { resource_type: 'auto', folder: 'claims' }
      );

      await Claim.findByIdAndUpdate(
        reference,
        {
          fileUrl: claimUrl.secure_url,
          fileUid: claimUrl.public_id,
          transactionId: id,
          payment: {
            status,
            amount: amount_in_cents,
            currency,
            paymentMethod: payment_method_type,
            transactionId: id,
          },
        },
        {
          new: true,
        }
      );

      const currentUrlPreviusClaim =
        'https://res.cloudinary.com/me-retracto/raw/upload/v1670812684/previous%20complaints%20models/reclamacion_previa_e08ljt.docx';

<<<<<<< HEAD
      await downloadModels(
        claim?.claimFields?.claimerEmail,
        currentUrlPreviusClaim
      );
=======
      await downloadModels(process.env.MAILER_USER, currentUrlPreviusClaim);
>>>>>>> df095f392cc009d33f25859949882f2b2ce55ae4
      await newClaimAlert(process.env.MAILER_USER);
    } else {
      await Claim.findByIdAndUpdate(
        reference,
        {
          transactionId: id,
          payment: {
            status,
            amount: amount_in_cents,
            currency,
            paymentMethod: payment_method_type,
            transactionId: id,
          },
        },
        {
          new: true,
        }
      );
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getClaimByTransactionId = async (req: Request, res: Response) => {
  try {
    const { transactionId } = req.params;
    const claim = await Claim.find({ transactionId });

    if (claim.length === 0)
      return res.status(404).json({ error: 'claim not found' });

    res.status(200).json({ claim });
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

import Claim from '../models/claims';
import { Request, Response } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import { UploadedFile } from 'express-fileupload';
import path, { dirname } from 'path';
import fs from 'fs';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import https from 'https';

cloudinary.config({
  cloud_name: 'dj7wucuvf',
  api_key: '227768484585757',
  api_secret: 'hszEQeX9GlorieTDMebBrMySzjE',
});

export const getClaims = async (req: Request, res: Response) => {
  try {
    const claims = await Claim.find();
    res.status(200).json(claims);
  } catch (error: any) {
    // TODO: Type error
    res.send('error');
    console.log('error: ', error);
  }
};

export const postClaimRender = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;
  const claim = await Claim.findById({ _id: id });
  //TODO: send error when claim is not found
  if (!claim) return;

  const file = fs.createWriteStream(path.resolve(__dirname, 'temp.docx'));
  await getFile(file, claim.fileUrl);

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

  res.json(claim);
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

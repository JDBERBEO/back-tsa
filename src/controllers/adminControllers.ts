import Template from '../models/templates';
import { Request, Response } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import { UploadedFile } from 'express-fileupload';

cloudinary.config({
  cloud_name: 'me-retracto',
  api_key: '381613826999381',
  api_secret: 'zstNjnStRqq-2ATDWtK5_JJcPTI',
});

export const getTemplates= async (req: Request, res: Response) => {
  try {
    const templates = await Template.find();
    res.status(200).json(templates);
  } catch (error: any) {
    // TODO: Type error
    res.send('error');
    console.log('error: ', error);
  }
};

export const uploadTemplate = async (req: Request, res: Response) => {
  try {
    const { body } = req;

    if (!req.files) return;

    const file = req.files.file as UploadedFile;
    const fileResp = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: 'auto',
    });

    body.fileUrl = fileResp.secure_url;
    body.fileUid = fileResp.public_id;

    const template = await Template.create(body);
    res.status(201).send({ template });
  } catch (error) {
    res.json({error: error})
    //TODO: Send error
    console.log('error: ', error);
  }
};

export const deleteTemplate = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const template = await Template.findById({ _id: id });

    if (!template) return;

    await cloudinary.uploader.destroy(template.fileUid, {
      type: 'upload',
      resource_type: 'raw',
    });

    await template.delete();
    const templates = await Template.find();
    res.status(200).json(templates);
  } catch (error) {
    console.log('error: ', error);
  }
};

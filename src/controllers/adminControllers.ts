import Template from '../models/templates';
import Admin from '../models/admin';
import { Request, Response } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import { UploadedFile } from 'express-fileupload';
import jwt from 'jsonwebtoken'

cloudinary.config({
  cloud_name: process.env.CLOUDIARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const signup = async (req:Request, res:Response) => {
  try {
    const { body } = req;
    const roomie = await Admin.create(body);
    const token = jwt.sign({ userId: roomie._id }, process.env.SECRET, {
      expiresIn: 60 * 60 * 24 * 365,
    });
    res.status(201).json({ token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}
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

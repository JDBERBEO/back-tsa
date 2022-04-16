import Claim from '../models/claims';
import { Request, Response } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import { UploadedFile } from 'express-fileupload';

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

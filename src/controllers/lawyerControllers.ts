import Claim from '../models/claims';
import { Request, Response } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import { UploadedFile } from 'express-fileupload';

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

export const updateClaim = async (req: Request, res: Response) => {
  
  try {
    const { id } = req.params;
    const claim = await Claim.findById({ _id: id });

    console.log('claim: ', claim)
    console.log('req.files: ', req)
    if (!req.files) return res.json({"error":"file not found"}) ;
    if (!claim) return res.json({"error":"claim not fond"}) ;

    await cloudinary.uploader.destroy(claim.fileUid, {
      type: 'upload',
      resource_type: 'raw',
    });


    const file = req.files.file as UploadedFile;
    const fileResp = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: 'auto',
    });

  
    const template = await Claim.findByIdAndUpdate(id,   { fileUrl: fileResp.url, fileUid: fileResp.public_id },
      {
        new: true,
      });
    res.status(201).send({ template });
  } catch (error) {
    res.json({error: error})
    //TODO: Send error
    console.log('error: ', error);
  }
};

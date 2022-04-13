import Claim from "../models/claims";
import { Request, Response } from "express"
import { v2 as cloudinary } from "cloudinary"
import { UploadedFile } from 'express-fileupload';



cloudinary.config({ 
  cloud_name: 'dj7wucuvf', 
  api_key: '227768484585757', 
  api_secret: 'hszEQeX9GlorieTDMebBrMySzjE' 
});


export const getClaims = async (req:Request , res: Response) => {
  try {
    const claims = await Claim.find()
    res.status(200).json(claims)
  } catch (error: any) {
    // TODO: Type error
    res.send('error')
    console.log('error: ', error)
  }
}

export const uploadClaim = async (req:Request , res: Response) => {

    try {
      const { body } = req;

      if (!req.files) return
    
      let file = req.files.file as UploadedFile
      const fileResp = await cloudinary.uploader.upload(file.tempFilePath, { resource_type: 'auto' })
      console.log('file: ', fileResp)

      body.fileUrl = fileResp.secure_url
      body.fileUid = fileResp.public_id

      const claim = await Claim.create(body);
      res.status(201).send({ claim})
    } catch (error) {
      //TODO: Send error
      console.log('error: ', error)
    }
}

export const deleteContract = async (req:Request , res: Response) => {
  
  try {

    const { id } = req.params;
    const claim = await Claim.findById({_id: id});
   

    if (!claim) return 
    
    await cloudinary.uploader.destroy(claim.fileUid, {type: 'upload', resource_type: 'raw'})

    await claim.delete()
    res.status(204).send()
  } catch (error) {
    console.log('error: ', error)
  }
}

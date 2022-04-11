import Claim from "../models/claims";
import { Request, Response } from "express"
import { v2 as cloudinary } from "cloudinary"
import { UploadedFile } from 'express-fileupload';



cloudinary.config({ 
  cloud_name: 'dj7wucuvf', 
  api_key: '227768484585757', 
  api_secret: 'hszEQeX9GlorieTDMebBrMySzjE' 
});


export const getClaims = async (request:Request , response: Response) => {
  try {
    const claims = await Claim.find()
    response.status(200).json(claims)
  } catch (error: any) {
    // TODO: Type error
    response.send('error')
    console.log('error: ', error)
  }
}

export const uploadClaim = async (req:Request , res: Response) => {

    try {
      const { body } = req;

      if (!req.files) return
    
      let file = req.files.file as UploadedFile
      const fileResp = await cloudinary.uploader.upload(file.tempFilePath, { resource_type: 'auto' })
   
      body.fileUrl = fileResp.secure_url
      body.fileUid = fileResp.public_id

      const claim = await Claim.create(body);
      res.status(201).send({ claim})
    } catch (error) {
      //TODO: Send error
      console.log('error: ', error)
    }
}

export const deleteContract = async (request:Request , response: Response) => {
  response.send('hola desde deleteContract')
}

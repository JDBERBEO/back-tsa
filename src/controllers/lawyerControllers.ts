import Claim from '../models/claims';
import { Request, Response } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import { UploadedFile } from 'express-fileupload';
import Lawyer from '../models/lawyer';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

cloudinary.config({
  cloud_name: 'me-retracto',
  api_key: '381613826999381',
  api_secret: 'zstNjnStRqq-2ATDWtK5_JJcPTI',
  secure: true
});


export const signup = async (req:Request, res:Response) => {
  try {
    const { body } = req;
    const lawyer = await Lawyer.create(body);
    const token = jwt.sign({ userId: lawyer._id }, process.env.SECRET as string, {
      expiresIn: 60 * 60 * 24,
    });
    res.status(201).json({ token });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}

export const signin =async (req:Request, res:Response) => {
  try {
    const { email, password } = req.body;

    const lawyer = await Lawyer.findOne({ email });

    if (!lawyer) {
      throw new Error("Password or invalid email");
    }

    const isValid = await bcrypt.compare(password, lawyer.password as string);

    if (!isValid) {
      throw new Error("Password or invalid email");
    }

    const token = jwt.sign({ userId: lawyer._id }, process.env.SECRET as string, {
      expiresIn: 60 * 60 * 24 * 365,
    });

    res.status(201).json({ token });
  } catch (error:any) {
    res.status(400).json({ message: error.message });
  }
}

export const getClaims = async (req: Request, res: Response) => {
  try {
    const claims = await Claim.find();
    res.status(200).json(claims);
  } catch (error: any) {
    // TODO: Type error
    res.send('error');
  }
};

export const getClaim = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const claim = await Claim.findById({ _id: id });

    if (!claim) return res.status(404).json({"error":"claim not found"}) ;

    res.status(200).json({claim});
  } catch (error: any) {
    // TODO: Type error
    res.send('error');
  }
};

export const updateClaim = async (req: Request, res: Response) => {
  
  try {
    const { id } = req.params;
    const claim = await Claim.findById({ _id: id });

    if (!req.files) return res.status(406).json({fileStatus: 'file Missing'})
    if (!claim) return res.status(404).json({"error":"claim not fond"}) ;

    await cloudinary.uploader.destroy(claim.fileUid, {
      type: 'upload',
      resource_type: 'raw',
      
    });


    const file = req.files.file as UploadedFile;
    const fileResp = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: 'auto',
      folder: 'claims',
      public_id: file.name,
    });

  
    const newClaim = await Claim.findByIdAndUpdate(id,   { fileUrl: fileResp.secure_url, fileUid: fileResp.public_id },
      {
        new: true,
      });

    res.status(201).send({ newClaim });
  } catch (error) {
    res.json({error: error})
  }
};

export const updateClaimStatus = async (req: Request, res: Response) => {
  
  try {
    const { id } = req.params;
    const {status } = req.body
    if (!status) return res.json({"error":"status not fond"})

    const claim = await Claim.findById({ _id: id });

    if (!claim) return res.json({"error":"claim not fond"}) ;
  
    const updatedClaim = await Claim.findByIdAndUpdate(id,   { status },
      {
        new: true,
      });
    res.status(201).send({ updatedClaim });
  } catch (error) {
    res.json({error: error})
  }
};

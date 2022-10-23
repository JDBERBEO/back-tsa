import ContactUs from '../models/contactUs';
import { Request, Response } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import { UploadedFile } from 'express-fileupload';
import path, { dirname } from 'path';
import fs from 'fs';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import https from 'https';
import Template from '../models/templates';
// import {newContactUs} from '../utils/mailer'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { newContactUs } = require("../utils/mailer");

cloudinary.config({
  cloud_name: 'me-retracto',
  api_key: '381613826999381',
  api_secret: 'zstNjnStRqq-2ATDWtK5_JJcPTI',
});

export const getAllContactUs = async (req: Request, res: Response) => {
  // try {
  //   const claims = await Claim.find();
  //   res.status(200).json(claims);
  // } catch (error: any) {
  //   // TODO: Type error
  //   res.send('error');
  //   console.log('error: ', error);
  // }
  console.log('it is fine')
};
export const postContactUs = async (req: Request, res: Response) => {
  try {
    const { body } = req
    const contactUsReport = await ContactUs.create(body)
    res.status(201).send({ contactUsReport });
    await newContactUs('meretracto2022@gmail.com', 'Pedro', 'pedro@gmail.com', 'esto es una prueba')
  } catch (error) {
    res.json(error)
  }
};
export const deleteContactUs = async (req: Request, res: Response) => {
  console.log('it is fine DELETE ALL CONTACT US')
};
export const deleteOneContactUs = async (req: Request, res: Response) => {
  console.log('it is fine DELETE ONE CONTACT US')
};
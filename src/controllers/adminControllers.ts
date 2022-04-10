import Admin from "../models/admin";
import { Request, Response } from "express"
import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})


export const getContracts = async (request:Request , response: Response) => {
  try {
    response.send('Funciona perro')

  } catch (error: any) {
    // TODO: Type error
    response.send('error')
    console.log('error: ', error)
  }
}

export const uploadContract = async (request:Request , response: Response) => {
  response.send('hola desde postcontrat')
}

export const deleteContract = async (request:Request , response: Response) => {
  response.send('hola desde deleteContract')
}

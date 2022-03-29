const adminRouter = require("express").Router();
import { Request, Response } from "express"


adminRouter.get('/', (request:Request , response: Response) => {
  response.send( 'hola');
});

// TODO: Creat auth middleware 
export default adminRouter;
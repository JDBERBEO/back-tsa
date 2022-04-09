const adminRouter = require("express").Router();
import { Request, Response } from "express"


adminRouter.get('/', (request:Request , response: Response) => {
  response.send( 'hola');
});
adminRouter.post('/', (request:Request , response: Response) => {
  response.send( 'hola desde post');
});
adminRouter.delete('/', (request:Request , response: Response) => {
  response.send( 'hola desde delete');
});

// TODO: Creat auth middleware 
export default adminRouter;
const adminRouter = require("express").Router();
import { getContracts, uploadContract, deleteContract } from '../controllers/adminControllers'
import { Request, Response } from "express"


adminRouter.get('/', getContracts)

adminRouter.post('/', uploadContract);
adminRouter.delete('/', deleteContract);

// TODO: Create auth middleware 
export default adminRouter;
const adminRouter = require("express").Router();
import { getContracts, uploadClaim, deleteContract } from '../controllers/adminControllers'
import { Request, Response } from "express"


adminRouter.get('/', getContracts)
adminRouter.post('/', uploadClaim);
adminRouter.delete('/', deleteContract);

// TODO: Create auth middleware 
export default adminRouter;
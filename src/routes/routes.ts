// const adminRouter = require('express').Router();
import express from 'express';
import {
  getClaims,
  uploadClaim,
  deleteClaim,
} from '../controllers/adminControllers';

const adminRouter = express.Router()

adminRouter.get('/', getClaims);
adminRouter.post('/', uploadClaim);
adminRouter.delete('/:id', deleteClaim);

// TODO: Create auth middleware
export default adminRouter;

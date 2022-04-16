import express, { Request, Response } from 'express';
import {
  getClaims,
  postClaimRender,
  //   deleteClaim,
} from '../controllers/customerControllers';

const customerRouter = express.Router();

customerRouter.get('/', getClaims);
customerRouter.post('/:id', postClaimRender);

// TODO: Create auth middleware
export default customerRouter;

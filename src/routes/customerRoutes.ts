import express from 'express';
import {
  getClaims,
  postClaimRender,
  transactionInfo,
} from '../controllers/customerControllers';

const customerRouter = express.Router();

customerRouter.get('/', getClaims);
customerRouter.post('/transactionInfo', transactionInfo);
customerRouter.post('/:id', postClaimRender);

// TODO: Create auth middleware
export default customerRouter;

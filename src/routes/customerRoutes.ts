import express from 'express';
import {
  getClaims,
  postClaimRender,
  transactionInfo,
} from '../controllers/customerControllers';

const customerRouter = express.Router();

customerRouter.get('/', getClaims);
customerRouter.post('/:id', postClaimRender);
customerRouter.post('/transactionInfo', transactionInfo);

// TODO: Create auth middleware
export default customerRouter;

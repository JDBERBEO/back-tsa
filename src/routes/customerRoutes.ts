import express from 'express';
import {
  getClaims,
  postClaimRender,
  transactionInfo,
  postPreviousCheckClaim,
  getClaimByTransactionId
} from '../controllers/customerControllers';

const customerRouter = express.Router();

customerRouter.get('/', getClaims);
customerRouter.post('/transactionInfo', transactionInfo);
customerRouter.post('/:id', postPreviousCheckClaim)
customerRouter.get('/:transactionId', getClaimByTransactionId)
// customerRouter.post('/:id', postClaimRender);

// TODO: Create auth middleware
export default customerRouter;

import express from 'express';
import {
  getClaims,
  transactionInfo,
  postPreviousCheckClaim,
  getClaimByTransactionId,
} from '../controllers/customerControllers';

const customerRouter = express.Router();

customerRouter.get('/', getClaims);
customerRouter.post('/transactionInfo', transactionInfo);
customerRouter.post('/:id', postPreviousCheckClaim);
customerRouter.get('/getClaim/:transactionId', getClaimByTransactionId);
// customerRouter.post('/:id', postClaimRender);

export default customerRouter;

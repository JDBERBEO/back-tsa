import express from 'express';
import {
  getClaims,
  transactionInfo,
  postPreviousCheckClaim,
  getClaimByTransactionId,
  updateClaimWithFile,
} from '../controllers/customerControllers';

const customerRouter = express.Router();

customerRouter.get('/', getClaims);
customerRouter.post('/transactionInfo', transactionInfo);
customerRouter.put('/:id', updateClaimWithFile);
customerRouter.post('/:id', postPreviousCheckClaim);
customerRouter.get('/getClaim/:transactionId', getClaimByTransactionId);

export default customerRouter;

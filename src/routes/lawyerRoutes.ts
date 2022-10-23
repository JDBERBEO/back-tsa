import express from 'express';
import {
  getClaims,
  updateClaim,
  updateClaimStatus,
  signup,
  signin,
  getClaim
} from '../controllers/lawyerControllers';

const lawyerRouter = express.Router();

lawyerRouter.get('/', getClaims);
lawyerRouter.put('/:id', updateClaim);
lawyerRouter.get('/getClaim/:id', getClaim);
lawyerRouter.put('/updateClaimStatus/:id', updateClaimStatus)
lawyerRouter.post('/signup', signup);
lawyerRouter.post('/signin', signin);


// TODO: Create auth middleware
export default lawyerRouter;

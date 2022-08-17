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

lawyerRouter.get('/getClaim/:id', getClaim);
lawyerRouter.get('/', getClaims);
lawyerRouter.put('/updateClaimStatus/:id', updateClaimStatus)
lawyerRouter.put('/:id', updateClaim);
lawyerRouter.post('/signup', signup);
lawyerRouter.post('/signin', signin);


// TODO: Create auth middleware
export default lawyerRouter;

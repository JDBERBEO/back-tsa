import express from 'express';
import {
  getClaims,
  updateClaim,
  signup,
  signin
} from '../controllers/lawyerControllers';

const lawyerRouter = express.Router();

lawyerRouter.get('/', getClaims);
lawyerRouter.put('/:id', updateClaim);
lawyerRouter.post('/signup', signup);
lawyerRouter.post('/signin', signin);


// TODO: Create auth middleware
export default lawyerRouter;

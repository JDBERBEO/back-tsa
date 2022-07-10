import express from 'express';
import {
  getClaims,
  updateClaim,
} from '../controllers/lawyerControllers';

const lawyerRouter = express.Router();

lawyerRouter.get('/', getClaims);
lawyerRouter.put('/:id', updateClaim);

// TODO: Create auth middleware
export default lawyerRouter;

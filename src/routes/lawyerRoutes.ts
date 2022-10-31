import express from 'express';
import {
  getClaims,
  updateClaim,
  updateClaimStatus,
  signup,
  signin,
  getClaim
} from '../controllers/lawyerControllers';
import {auth} from '../utils/middlewares'

const lawyerRouter = express.Router();

lawyerRouter.get('/', auth, getClaims);
lawyerRouter.put('/:id', auth, updateClaim);
lawyerRouter.get('/getClaim/:id', auth, getClaim);
lawyerRouter.put('/updateClaimStatus/:id', auth, updateClaimStatus)
lawyerRouter.post('/signup', signup);
lawyerRouter.post('/signin',  signin);


// TODO: Create auth middleware
export default lawyerRouter;

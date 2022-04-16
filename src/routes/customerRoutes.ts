import express, { Request, Response } from 'express';
import {
  getClaims,
  //   uploadClaim,
  //   deleteClaim,
} from '../controllers/adminControllers';

const customerRouter = express.Router();

customerRouter.get('/', getClaims);
customerRouter.post('/', (req: Request, res: Response) => {
  res.send('works');
});

// TODO: Create auth middleware
export default customerRouter;

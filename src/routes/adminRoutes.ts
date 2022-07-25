import express from 'express';
import {
  getTemplates,
  uploadTemplate,
  deleteTemplate,
  signup,
  signin,
  deleteClaim,
  deleteClaims,
  getAdmins
} from '../controllers/adminControllers';
import {auth} from '../utils/middlewares'

const adminRouter = express.Router();

adminRouter.get('/allAdmins', getAdmins);
adminRouter.get('/', getTemplates);
adminRouter.post('/', uploadTemplate);
adminRouter.post('/signup', signup);
adminRouter.post('/signin', signin);
adminRouter.delete('/deleteAllClaims', deleteClaims);
adminRouter.delete('/deleteClaims/:id', deleteClaim);
adminRouter.delete('/:id', deleteTemplate);


// TODO: Create auth middleware
export default adminRouter;

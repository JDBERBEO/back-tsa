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

adminRouter.get('/allAdmins', auth, getAdmins);
adminRouter.get('/', getTemplates);
adminRouter.post('/', auth, uploadTemplate);
adminRouter.post('/signup', signup);
adminRouter.post('/signin', signin);
adminRouter.delete('/deleteAllClaims', auth, deleteClaims);
adminRouter.delete('/deleteClaims/:id', auth, deleteClaim);
adminRouter.delete('/:id', auth, deleteTemplate);


// TODO: Create auth middleware
export default adminRouter;

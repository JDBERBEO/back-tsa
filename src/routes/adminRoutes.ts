import express from 'express';
import {
  getTemplates,
  uploadTemplate,
  deleteTemplate,
  signup,
  signin
} from '../controllers/adminControllers';
import {auth} from '../utils/middlewares'

const adminRouter = express.Router();

adminRouter.get('/', getTemplates);
adminRouter.post('/', uploadTemplate);
adminRouter.delete('/:id', deleteTemplate);
adminRouter.post('/signup', signup);
adminRouter.post('/signin', signin);

// TODO: Create auth middleware
export default adminRouter;

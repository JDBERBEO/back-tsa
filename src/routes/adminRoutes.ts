import express from 'express';
import {
  getTemplates,
  uploadTemplate,
  deleteTemplate,
  signup
} from '../controllers/adminControllers';

const adminRouter = express.Router();

adminRouter.get('/', getTemplates);
adminRouter.post('/', uploadTemplate);
adminRouter.delete('/:id', deleteTemplate);
adminRouter.post('/signup', signup)

// TODO: Create auth middleware
export default adminRouter;

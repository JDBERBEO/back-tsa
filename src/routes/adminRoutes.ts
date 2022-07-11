import express from 'express';
import {
  getTemplates,
  uploadTemplate,
  deleteTemplate,
} from '../controllers/adminControllers';

const adminRouter = express.Router();

adminRouter.get('/', getTemplates);
adminRouter.post('/', uploadTemplate);
adminRouter.delete('/:id', deleteTemplate);

// TODO: Create auth middleware
export default adminRouter;

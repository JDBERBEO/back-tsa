import express from 'express';
import { getAllContactUs, postContactUs, deleteContactUs, deleteOneContactUs } from '../controllers/contactUsControllers';
import {auth} from '../utils/middlewares'

const contactUsRouter = express.Router();

contactUsRouter.get('/allContactUs', getAllContactUs);
contactUsRouter.post('/postContactUs', postContactUs);
contactUsRouter.delete('/deleteAllContactUs', deleteContactUs);
contactUsRouter.delete('/deleteAllContactUs/:id', deleteOneContactUs);



// TODO: Create auth middleware
export default contactUsRouter;

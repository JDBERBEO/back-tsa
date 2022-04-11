const adminRouter = require("express").Router();
import { getClaims, uploadClaim, deleteContract } from '../controllers/adminControllers'


adminRouter.get('/', getClaims)
adminRouter.post('/', uploadClaim);
adminRouter.delete('/:id', deleteContract);

// TODO: Create auth middleware 
export default adminRouter;
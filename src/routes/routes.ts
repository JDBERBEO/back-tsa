const adminRouter = require("express").Router();
import { getClaims, uploadClaim, deleteClaim } from '../controllers/adminControllers'


adminRouter.get('/', getClaims)
adminRouter.post('/', uploadClaim);
adminRouter.delete('/:id', deleteClaim);

// TODO: Create auth middleware 
export default adminRouter;
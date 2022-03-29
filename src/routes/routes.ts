const router = require("express").Router();
import { Request, Response } from "express"
// import reservationController from "../controllers/reservation.controller";


router.get('/', (request:Request , response: Response) => {
  response.send( 'hola');
});

// TODO: Creat auth middleware 
module.exports = router;
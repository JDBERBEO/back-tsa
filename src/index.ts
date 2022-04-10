import express, {Application, Request, Response} from 'express';
import connect from "./dataBase";
import adminRouter from "./routes/routes";

import dotenv from 'dotenv'; 

dotenv.config()

const app: Application = express();
connect()

app.use("/administrator", adminRouter);


app.listen(3000, () => {
    console.log('The application is listening on port 3000!');
})
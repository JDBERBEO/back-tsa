import express, {Application, Request, Response} from 'express';
import connect from "./dataBase";
import adminRouter from "./routes/routes";
import cors from 'cors'
import fileUpload from 'express-fileupload';


import dotenv from 'dotenv'; 

dotenv.config()

const app: Application = express();
connect()

app.use(cors())
app.use(express.json())
app.use(express.static('src/public'))
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
  }))

app.use("/administrator", adminRouter);


app.listen(3000, () => {
    console.log('The application is listening on port 3000!');
})
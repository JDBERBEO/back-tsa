import express, { Application } from 'express';
import connect from './dataBase';
import adminRouter from './routes/adminRoutes';
import lawyerRouter from './routes/lawyerRoutes';
import customerRouter from './routes/customerRoutes';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import dotenv from 'dotenv';
import contactUsRouter from './routes/contactsUsRoutes';

dotenv.config();

const app: Application = express();
connect();

app.use(cors());
app.use(express.json());
app.use(express.static('src/public'));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
  })
);

app.use('/administrator', adminRouter);
app.use('/lawyer', lawyerRouter);
app.use('/customer', customerRouter);
app.use('/contactUs', contactUsRouter);

app.listen(4000, () => {
  console.log('The application is listening on port 4000!');
});

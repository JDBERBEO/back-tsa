import express, {Application, Request, Response} from 'express';
const connect = require("./dataBase");

const app: Application = express();
connect()

app.get('/', (req: Request, res:Response) => {
    res.send('Well done!');
})


app.listen(3000, () => {
    console.log('The application is listening on port 3000!');
})
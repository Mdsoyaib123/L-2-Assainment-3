import express, { Request, Response } from 'express';
const app = express();
import cors from 'cors';
import router from './app/routes';
import globalErrorHandler from './app/middlware/globalErrorHan';

// parser
app.use(express.json());
// app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:3000'] }));


app.get("/", (req:Request, res:Response) => {
    res.json(
      " app is running "
    )
  });

// application routes
app.use('/api', router);


// handle global error 
app.use(globalErrorHandler);


export default app;

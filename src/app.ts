import express from 'express';
const app = express();
import cors from 'cors';
import router from './app/routes';
import globalErrorHan from './app/middlware/globalErrorHan';


// parser
app.use(express.json());
// app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:3000'] }));



// application routes
app.use('/api', router);


// handle global error 
app.use(globalErrorHan)


export default app;

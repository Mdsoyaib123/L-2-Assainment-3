import express from 'express';
const app = express();
import cors from 'cors';
import router from './app/routes';


// parser
app.use(express.json());
// app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:3000'] }));



// application routes
app.use('/', router);



export default app;

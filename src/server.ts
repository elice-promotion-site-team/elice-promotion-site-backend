import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { guestbookRouter } from './routes';
import { errorHandler } from './middlewares';

const app = express();
app.use(cors());

// Content-Type: application/json 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.json());

// Content-Type: application/x-www-form-urlencoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.SERVER_PORT;

app.use('/api', guestbookRouter);

app.use(errorHandler);

app.listen(PORT);

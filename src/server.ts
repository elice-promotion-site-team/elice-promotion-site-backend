import express from 'express';
import cors from 'cors';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import { guestbookRouter, authRouter } from './routes';
import { errorHandler, getUserFromJWT } from './middlewares';
import { usePassport } from './passport';

usePassport();
const app = express();
app.use(cors());

// Content-Type: application/json 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.json());

// Content-Type: application/x-www-form-urlencoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

const PORT = process.env.SERVER_PORT;

app.use(passport.initialize());

// app.use(getUserFromJWT);

app.use('/api', guestbookRouter);
app.use('/auth', authRouter);

app.use(errorHandler);

app.listen(PORT);

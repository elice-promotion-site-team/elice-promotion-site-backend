import { Router } from 'express';
import { guestbookRouter, userRouter } from './api/';
import { loginRequired } from '../middlewares';

const apiRouter = Router();

apiRouter.use('/guestbook', /*loginRequired,*/ guestbookRouter);
apiRouter.use('/user', /*loginRequired,*/ userRouter);

export { apiRouter };

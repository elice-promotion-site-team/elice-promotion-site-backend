import express, { Router } from 'express';
import path from 'path';
import { chatService } from '../services';
const chatRouter = Router();

chatRouter.get('/', async (req: express.Request, res: express.Response, next) => {
  try {
    console.log('채팅기록', await chatService.getChats);
    res.sendFile(path.resolve(__dirname + '/../static/index.html'));
  } catch (error) {
    next(error);
  }
});

export { chatRouter };

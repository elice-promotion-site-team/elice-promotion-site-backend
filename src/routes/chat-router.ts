import express, { Router } from 'express';
import path from 'path';
import { chatService } from '../services';
const chatRouter = Router();

chatRouter.get('/', async (req: express.Request, res: express.Response, next) => {
  try {
    const chats = await chatService.getChats();
    console.log(chats.map((chat) => ({ name: chat.nickname, msg: chat.message, time: chat.time })));
    res.sendFile(path.resolve(__dirname + '/../static/index.html'));
  } catch (error) {
    next(error);
  }
});

export { chatRouter };

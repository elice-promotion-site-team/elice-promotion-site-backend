import express, { Router } from 'express';
import path from 'path';
const chatRouter = Router();

chatRouter.get('/', async (req: express.Request, res: express.Response, next) => {
  try {
    res.sendFile(path.resolve(__dirname + '/../static/index.html'));
  } catch (error) {
    next(error);
  }
});

export { chatRouter };

// import is from '@sindresorhus/is';
import { Router, Request, Response, NextFunction } from 'express';
// import { loginRequired } from '../middlewares';
import { quizService } from '../services';

const quizRouter = Router();

quizRouter.get('/quizzes', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const quizzes = await quizService.getQuizzes();

    res.status(200).json(quizzes);
  } catch (error) {
    next(error);
  }
});

quizRouter.get('/:quizNumber', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const quizNumber = Number(req.params.quizNumber);
    const quizData = await quizService.getQuizDataByQuizNumber(quizNumber);

    res.status(200).json(quizData);
  } catch (error) {
    next(error);
  }
});

quizRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const quizInfo = req.body;
    const newQuiz = await quizService.addQuiz(quizInfo);
    res.status(201).json(newQuiz);
  } catch (error) {
    next(error);
  }
});

quizRouter.patch('/:quizNumber', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const quizNumber = Number(req.params.quizNumber);
    const update = req.body;

    const updatedQuiz = await quizService.setQuiz(quizNumber, update);
    res.status(200).json(updatedQuiz);
  } catch (error) {
    next(error);
  }
});

export { quizRouter };

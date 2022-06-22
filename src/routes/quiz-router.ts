// import is from '@sindresorhus/is';
import { Router } from 'express';
import { nextTick } from 'process';
// import { loginRequired } from '../middlewares';
import { quizService } from '../services';

const quizRouter = Router();

quizRouter.get('/quizzes', async (req, res, next) => {
  try {
    const quizzes = await quizService.getQuizzes();

    res.status(200).json(quizzes);
  } catch (error) {
    next(error);
  }
});

quizRouter.get('/:quizNumber', async (req, res, next) => {
  try {
    const quizNumber = Number(req.params.quizNumber);
    const quizData = await quizService.getQuizDataByQuizNumber(quizNumber);

    res.status(200).json(quizData);
  } catch (error) {
    next(error);
  }
});

quizRouter.post('/', async (req, res, next) => {
  try {
    const quizInfo = req.body;
    const newQuiz = await quizService.addQuiz(quizInfo);
    res.status(201).json(newQuiz);
  } catch (error) {
    next(error);
  }
});

quizRouter.patch('/:quizNumber', async (req, res, next) => {
  try {
    const quizNumber = Number(req.params.quizNumber);
    const update = req.body;
    console.log(update);

    const updatedQuiz = await quizService.setQuiz(quizNumber, update);
    res.status(200).json(updatedQuiz);
  } catch (error) {
    next(error);
  }
});

export { quizRouter };

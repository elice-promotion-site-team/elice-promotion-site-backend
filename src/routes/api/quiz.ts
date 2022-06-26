import { Router, Request, Response, NextFunction } from 'express';
import { quizService } from '../../services';

interface QuizUpdate {
  quizNumber: number;
  result: boolean;
}

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

quizRouter.patch('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // quiz = {quizNumber: 1, corrected: true || false};
    const update: '무슨타입이지?' = req.body; // 배열
    console.log('업데이트', update);
    const updatedQuiz = update.map(async (quiz: QuizUpdate) => {
      await quizService.setQuiz(quiz.quizNumber, quiz.result);
    });

    res.status(200).json(updatedQuiz);
  } catch (error) {
    next(error);
  }
});

export { quizRouter };

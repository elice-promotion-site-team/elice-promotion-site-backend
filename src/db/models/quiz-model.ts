import { model, Types, Document } from 'mongoose';
import { QuizSchema } from '../schemas/quiz-schema';

const Quiz = model('quizzes', QuizSchema);

export interface QuizInfo {
  quizNumber: number;
  corrected: number;
  solved: number;
}

export interface QuizData extends Document<Types.ObjectId> {
  quizNumber: number;
  corrected: number;
  solved: number;
}

interface ToUpdate {
  quizNumber: number;
  update: {
    [key: number]: number;
  };
}

export class QuizModel {
  async create(quizInfo: QuizInfo): Promise<QuizData> {
    const createdNewQuiz = await Quiz.create(quizInfo);
    return createdNewQuiz;
  }

  async findAll(): Promise<QuizData[]> {
    const chats = await Quiz.find({});
    return chats;
  }

  async findByQuizNumber(quizNumber: Number): Promise<QuizData[]> {
    const quizzes = await Quiz.find({ quizNumber });
    return quizzes;
  }

  async update({ quizNumber, update }: ToUpdate): Promise<QuizData> {
    const filter = { quizNumber };
    const option = { returnOriginal: false };

    const updatedQuizzes = await Quiz.findOneAndUpdate(filter, update, option);
    if (!updatedQuizzes) {
      throw new Error('NotFound');
    }
    return updatedQuizzes;
  }
}

const quizModel = new QuizModel();

export { quizModel };

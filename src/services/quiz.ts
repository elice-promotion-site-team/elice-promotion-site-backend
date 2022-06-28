import { Quiz } from '../models';
import { Types, Document } from 'mongoose';
interface QuizInfo {
  quizNumber: number;
  quizName: string;
  corrected: number;
  solved: number;
}

interface QuizData extends Document<Types.ObjectId> {
  quizNumber: number;
  quizName: string;
  corrected: number;
  solved: number;
}
class QuizService {
  async addQuiz(quizInfo: QuizInfo): Promise<QuizData> {
    const { quizNumber } = quizInfo;
    const quiz = await Quiz.findOne({ quizNumber });
    // db에 이미 존재하는 경우, 에러 메시지 반환
    if (quiz) {
      const error = new Error('이 퀴즈 번호는 현재 사용중입니다. 다른 번호를 입력해 주세요.');
      error.name = 'Conflict';
      throw error;
    }

    const createdNewQuiz = await Quiz.create(quizInfo);
    return createdNewQuiz;
  }

  async getQuizzes(): Promise<QuizData[]> {
    const quizzes = await Quiz.find({});
    return quizzes;
  }

  async getQuizDataByQuizNumber(quizNumber: number): Promise<QuizData> {
    const quiz = await Quiz.findOne({ quizNumber });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!quiz) {
      const error = new Error('해당 번호의 문제가 없습니다. 다시 한 번 확인해 주세요.');
      error.name = 'NotFound';
      throw error;
    }
    return quiz;
  }

  async setQuiz(quizNumber: number, update: Partial<QuizInfo>): Promise<QuizData> {
    // 업데이트 진행

    const updatedQuiz = await Quiz.findOneAndUpdate({ quizNumber }, update, { returnOriginal: false });
    if (!updatedQuiz) {
      const error = new Error('업데이트에 실패하였습니다.');
      error.name = 'NotFound';
      throw error;
    }
    return updatedQuiz;
  }
}

const quizService = new QuizService();

export { quizService };

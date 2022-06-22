import { quizModel, QuizModel, QuizInfo, QuizData } from '../db';

class ChatService {
  constructor(private quizModel: QuizModel) {}

  async addQuiz(quizInfo: QuizInfo): Promise<QuizData> {
    const { quizNumber } = quizInfo;

    const quiz = await this.quizModel.findByQuizNumber(quizNumber);
    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (quiz) {
      throw new Error('이 퀴즈 번호는 현재 사용중입니다. 다른 번호를 입력해 주세요.');
    }

    const createdNewQuiz = await this.quizModel.create(quizInfo);
    return createdNewQuiz;
  }

  async getQuizzes(): Promise<QuizData[]> {
    const quizzes = await this.quizModel.findAll();
    return quizzes;
  }

  async getQuizDataByQuizNumber(quizNumber: number): Promise<QuizData> {
    const quiz = await this.quizModel.findByQuizNumber(quizNumber);

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!quiz) {
      throw new Error('해당 번호의 문제가 없습니다. 다시 한 번 확인해 주세요.');
    }
    return quiz[0];
  }

  async setQuiz(quizNumber: number, update: Partial<QuizInfo>): Promise<QuizData> {
    // 업데이트 진행
    const updatedQuiz = await this.quizModel.update({ quizNumber, update });

    return updatedQuiz;
  }
}

import { Schema } from 'mongoose';

const QuizSchema = new Schema(
  {
    quizNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    quizName: {
      type: String,
      required: true,
      default: '연습 문제',
    },
    corrected: {
      type: Number,
      required: true,
      default: 0,
    },
    solved: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    collection: 'quizzes',
    timestamps: true,
  },
);

export { QuizSchema };

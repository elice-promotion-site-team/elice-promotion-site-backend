import { Schema } from 'mongoose';

const QuizSchema = new Schema(
  {
    quizNumber: {
      type: Number,
      required: true,
    },
    corrected: {
      type: Number,
      required: true,
    },
    solved: {
      type: Number,
      required: true,
    },
  },
  {
    collection: 'quizzes',
    timestamps: true,
  },
);

export { QuizSchema };

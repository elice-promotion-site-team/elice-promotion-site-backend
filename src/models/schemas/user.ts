import { Schema } from 'mongoose';

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
    isSolved: {
      type: Boolean,
      required: true,
      default: false,
    },
    solved: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    collection: 'users',
    timestamps: true,
  },
);

export { UserSchema };

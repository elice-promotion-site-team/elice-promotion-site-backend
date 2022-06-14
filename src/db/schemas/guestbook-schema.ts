import { Schema } from 'mongoose';

const GuestBookSchema = new Schema(
  {
    nickname: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    collection: 'comments',
    timestamps: true,
  },
);

export { GuestBookSchema };

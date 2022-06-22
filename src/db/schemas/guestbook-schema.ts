import { Schema } from 'mongoose';

const GuestbookSchema = new Schema(
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
    collection: 'guestbooks',
    timestamps: true,
  },
);

export { GuestbookSchema };

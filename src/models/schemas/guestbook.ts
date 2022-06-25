import { Schema } from 'mongoose';

const GuestbookSchema = new Schema(
  {
    name: {
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

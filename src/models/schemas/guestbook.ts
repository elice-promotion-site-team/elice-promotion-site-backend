import { Schema } from 'mongoose';

const GuestbookSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users',
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

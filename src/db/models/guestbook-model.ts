import { model } from 'mongoose';
import { GuestBookSchema } from '../schemas/guestbook-schema';

const GuestBook = model('comments', GuestBookSchema);

export interface GuestBookInfo {
  nickname: string;
  comment: string;
}

export interface GuestBookData {
  _id: string;
  nickname: string;
  comment: string;
}

interface ToUpdate {
  _id: string;
  update: {
    [key: string]: string;
  };
}

export class GuestBookModel {
  async create(guestbookInfo: GuestBookInfo): Promise<GuestBookData> {
    const createdNewGuestBook = await GuestBook.create(guestbookInfo);
    return createdNewGuestBook;
  }

  async findAll(): Promise<GuestBookData[]> {
    const guestbooks = await GuestBook.find({});
    return guestbooks;
  }

  async findById(_id: string): Promise<GuestBookData> {
    const guestbook = await GuestBook.findOne({ _id });
    return guestbook;
  }

  async update({ _id, update }: ToUpdate): Promise<GuestBookData> {
    const filter = { _id };
    const option = { returnOriginal: false };

    const updatedGuestBook = await GuestBook.findOneAndUpdate(filter, update, option);
    return updatedGuestBook;
  }

  async deleteById(_id: string): Promise<{ deletedCount: number }> {
    const result = await GuestBook.deleteOne({ _id });
    return result;
  }
}

const guestbookModel = new GuestBookModel();

export { guestbookModel };

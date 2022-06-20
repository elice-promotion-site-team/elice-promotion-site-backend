import { model, Types, Document } from 'mongoose';
import { GuestbookSchema } from '../schemas/guestbook-schema';

const Guestbook = model('guestbooks', GuestbookSchema);

export interface GuestbookInfo {
  nickname: string;
  comment: string;
}

export interface GuestbookData extends Document<Types.ObjectId> {
  nickname: string;
  comment: string;
}

interface ToUpdate {
  _id: string;
  update: {
    [key: string]: string;
  };
}

export class GuestbookModel {
  async create(guestbookInfo: GuestbookInfo): Promise<GuestbookData> {
    const createdNewGuestbook = await Guestbook.create(guestbookInfo);
    return createdNewGuestbook;
  }

  async findAll(): Promise<GuestbookData[]> {
    const guestbooks = await Guestbook.find({});
    return guestbooks;
  }

  async findById(_id: string): Promise<GuestbookData> {
    const guestbook = await Guestbook.findOne({ _id });
    return guestbook as any;
  }

  async findByNickname(nickname: string): Promise<GuestbookData> {
    const guestbook = await Guestbook.findOne({ nickname });
    return guestbook as any;
  }

  async update({ _id, update }: ToUpdate): Promise<GuestbookData> {
    const filter = { _id };
    const option = { returnOriginal: false };

    const updatedGuestbook = await Guestbook.findOneAndUpdate(filter, update, option);
    return updatedGuestbook as any;
  }

  async deleteById(_id: string): Promise<{ deletedCount: number }> {
    const result = await Guestbook.deleteOne({ _id });
    return result;
  }
}

const guestbookModel = new GuestbookModel();

export { guestbookModel };

import { model, Types, Document } from 'mongoose';
import { ChatSchema } from '../schemas/chat-schema';

const Chat = model('chats', ChatSchema);

export interface ChatInfo {
  nickname: string;
  message: string;
  time: string;
}

export interface ChatData extends Document<Types.ObjectId> {
  nickname: string;
  message: string;
  time: string;
}

export class ChatModel {
  async create(chatInfo: ChatInfo): Promise<ChatData> {
    const createdNewChat = await Chat.create(chatInfo);
    return createdNewChat; // 타입 에러 Type 'ObjectId' is not assignable to type 'string'.
  }

  async findAll(): Promise<ChatData[]> {
    const chats = await Chat.find({});
    return chats; // 타입 에러 Type 'ObjectId' is not assignable to type 'string'.
  }
}

const chatModel = new ChatModel();

export { chatModel };

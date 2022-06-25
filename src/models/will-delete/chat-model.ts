import { model, Types, Document } from 'mongoose';
import { ChatSchema } from '../schemas/chat';

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
    return createdNewChat;
  }

  async findAll(): Promise<ChatData[]> {
    const chats = await Chat.find({});
    return chats;
  }
}

const chatModel = new ChatModel();

export { chatModel };

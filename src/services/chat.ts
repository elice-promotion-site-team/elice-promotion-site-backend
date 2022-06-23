import { chatModel, ChatModel, ChatInfo, ChatData } from '../db';

class ChatService {
  constructor(private chatModel: ChatModel) {}

  async addChat(chatInfo: ChatInfo): Promise<ChatData> {
    // db에 저장
    const createdNewChat = await this.chatModel.create(chatInfo);
    return createdNewChat;
  }

  async getChats(): Promise<ChatData[]> {
    const chats = await this.chatModel.findAll();
    return chats;
  }
}

const chatService = new ChatService(chatModel);

export { chatService };

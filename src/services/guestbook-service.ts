import { guestbookModel, GuestbookModel, GuestbookInfo, GuestbookData } from '../db';

class GuestbookService {
  constructor(private guestbookModel: GuestbookModel) {}

  async addGuestbook(guestbookInfo: GuestbookInfo): Promise<GuestbookData> {
    // 객체 destructuring
    const { nickname } = guestbookInfo;

    // 이름 중복 확인
    const guestbook = await this.guestbookModel.findByNickname(nickname);
    if (guestbook) {
      const error = new Error('이 이름은 현재 사용중입니다. 다른 이름을 입력해 주세요.');
      error.name = 'Conflict';
      throw error;
    }

    // db에 저장
    const createdNewGuestbook = await this.guestbookModel.create(guestbookInfo);

    return createdNewGuestbook;
  }

  async getGuestbooks(): Promise<GuestbookData[]> {
    const guestbooks = await this.guestbookModel.findAll();
    return guestbooks;
  }

  async getGuestbookDataById(_id: string): Promise<GuestbookData> {
    const guestbook = await this.guestbookModel.findById(_id);

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!guestbook) {
      const error = new Error('해당 id의 방명록이 없습니다. 다시 한 번 확인해 주세요.');
      error.name = 'NotFound';
      throw error;
    }

    return guestbook;
  }

  async getGuestbookDataByNickname(guestbookNickname: string): Promise<GuestbookData> {
    const guestbook = await this.guestbookModel.findByNickname(guestbookNickname);

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!guestbook) {
      const error = new Error('해당 이름의 방명록이 없습니다. 다시 한 번 확인해 주세요.');
      error.name = 'NotFound';
      throw error;
    }

    return guestbook;
  }

  async setGuestbook(_id: string, update: Partial<GuestbookInfo>): Promise<GuestbookData> {
    // 업데이트 진행
    const updatedGuestbook = await this.guestbookModel.update({ _id, update });

    return updatedGuestbook;
  }

  async deleteGuestbookData(_id: string): Promise<{ result: string }> {
    const { deletedCount } = await this.guestbookModel.deleteById(_id);

    // 삭제에 실패한 경우, 에러 메시지 반환
    if (deletedCount === 0) {
      throw new Error(`${_id} 방명록의 삭제에 실패하였습니다`);
    }

    return { result: 'success' };
  }
}

const guestbookService = new GuestbookService(guestbookModel);

export { guestbookService };

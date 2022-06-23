import { User } from '../db';

interface UserInfo {
  email: string;
  name: string;
  password: string;
}

interface UserData {
  _id: string;
  email: string;
  name: string;
  password: string;
}

class UserService {
  async addUser(userInfo: UserInfo): Promise<UserData> {
    // 객체 destructuring
    const { name } = userInfo;

    // 이름 중복 확인
    const user = await User.findOne({ name });
    if (user) {
      throw new Error('이 이름은 현재 사용중입니다. 다른 이름을 입력해 주세요.');
    }

    // db에 저장
    const createdNewUser = await User.create(userInfo);

    return createdNewUser;
  }

  async getUsers(): Promise<UserData[]> {
    const users = await User.find({});
    return users;
  }

  async getUserDataById(_id: string): Promise<UserData> {
    const user = await User.findOne({ _id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!user) {
      throw new Error('해당 id의 사용자는 없습니다. 다시 한 번 확인해 주세요.');
    }

    return user;
  }

  async getUserDataByNickname(userNickname: string): Promise<UserData> {
    const user = await User.findOne({ userNickname });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!user) {
      throw new Error('해당 이름의 사용자는 없습니다. 다시 한 번 확인해 주세요.');
    }

    return user;
  }

  async setUser(_id: string, update: Partial<UserInfo>): Promise<UserData> {
    // 업데이트 진행
    const updatedUser = await User.findOneAndUpdate({ _id }, update, { returnOriginal: false });
    return updatedUser;
  }

  async deleteUserData(_id: string): Promise<{ result: string }> {
    const { deletedCount } = await User.deleteOne({ _id });

    // 삭제에 실패한 경우, 에러 메시지 반환
    if (deletedCount === 0) {
      throw new Error(`${_id} 사용자의 삭제에 실패하였습니다`);
    }

    return { result: 'success' };
  }
}

const userService = new UserService();

export { userService };

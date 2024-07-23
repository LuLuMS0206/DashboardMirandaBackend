import { User } from '../interfaces/userInterface';
import userDataList from './../data/users';
import { APIError } from '../utils/APIError';

export class UserService {
  static fetchAll(): User[] {
    return userDataList as User[];
  }

  static fetchOne(userId: string): User {
    const user = userDataList.find((user: User) => user.id === userId);
    if (!user) {
      throw new APIError('User not found', 404, true);
    }
    return user;
  }

  static addUser(newUser: User): void {
    userDataList.push(newUser);
  }

  static removeUser(userId: string): User[] {
    const index = userDataList.findIndex((user: User) => user.id === userId);
    if (index === -1) {
      throw new APIError('User not found', 404, true);
    }
    userDataList.splice(index, 1);
    return userDataList;
  }

  static modifyUser(modifiedUser: User): User[] {
    const index = userDataList.findIndex((user: User) => user.id === modifiedUser.id);
    if (index === -1) {
      throw new APIError('User not found', 404, true);
    }
    userDataList[index] = modifiedUser;
    return userDataList;
  }
}

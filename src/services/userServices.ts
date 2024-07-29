
import { User } from './../interfaces/userInterface';
import { UserModel, UserDocument } from '../models/userModel';
import { APIError } from './../utils/APIError';

export class UserService {
    static async fetchAll(): Promise<UserDocument[]> {
        try {
            return await UserModel.find().exec();
        } catch (error) {
            throw new APIError((error as Error).message, 500, false);
        }
    }

    static async fetchOne(userId: string): Promise<UserDocument | null> {
        try {
            const user = await UserModel.findById(userId).exec();
            if (!user) throw new APIError('User not found', 404, true);
            return user;
        } catch (error) {
            throw new APIError((error as Error).message, 500, false);
        }
    }

    static async fetchByEmail(email: string): Promise<UserDocument | null> {
        try {
            const user = await UserModel.findOne({ email }).exec();
            return user;
        } catch (error) {
            throw new APIError((error as Error).message, 500, false);
        }
    }

    static async addUser(newUser: User): Promise<UserDocument> {
        try {
            const user = new UserModel(newUser);
            await user.save();
            return user;
        } catch (error) {
            throw new APIError((error as Error).message, 500, false);
        }
    }

    static async removeUser(userId: string): Promise<void> {
        try {
            const result = await UserModel.findByIdAndDelete(userId).exec();
            if (!result) throw new APIError('User not found', 404, true);
        } catch (error) {
            throw new APIError((error as Error).message, 500, false);
        }
    }

    static async modifyUser(modifiedUser: User & { _id: string }): Promise<UserDocument | null> {
        try {
            const user = await UserModel.findByIdAndUpdate(modifiedUser._id, modifiedUser, { new: true }).exec();
            if (!user) throw new APIError('User not found', 404, true);
            return user;
        } catch (error) {
            throw new APIError((error as Error).message, 500, false);
        }
    }
}

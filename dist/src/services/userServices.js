"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const userModel_1 = require("../models/userModel");
const APIError_1 = require("./../utils/APIError");
class UserService {
    static fetchAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield userModel_1.UserModel.find().exec();
            }
            catch (error) {
                throw new APIError_1.APIError(error.message, 500, false);
            }
        });
    }
    static fetchOne(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield userModel_1.UserModel.findById(userId).exec();
                if (!user)
                    throw new APIError_1.APIError('User not found', 404, true);
                return user;
            }
            catch (error) {
                throw new APIError_1.APIError(error.message, 500, false);
            }
        });
    }
    static fetchByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield userModel_1.UserModel.findOne({ email }).exec();
                return user;
            }
            catch (error) {
                throw new APIError_1.APIError(error.message, 500, false);
            }
        });
    }
    static addUser(newUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = new userModel_1.UserModel(newUser);
                yield user.save();
                return user;
            }
            catch (error) {
                throw new APIError_1.APIError(error.message, 500, false);
            }
        });
    }
    static removeUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield userModel_1.UserModel.findByIdAndDelete(userId).exec();
                if (!result)
                    throw new APIError_1.APIError('User not found', 404, true);
            }
            catch (error) {
                throw new APIError_1.APIError(error.message, 500, false);
            }
        });
    }
    static modifyUser(modifiedUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield userModel_1.UserModel.findByIdAndUpdate(modifiedUser._id, modifiedUser, { new: true }).exec();
                if (!user)
                    throw new APIError_1.APIError('User not found', 404, true);
                return user;
            }
            catch (error) {
                throw new APIError_1.APIError(error.message, 500, false);
            }
        });
    }
    static authenticate(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield userModel_1.UserModel.findOne({ email }).exec();
                if (!user)
                    throw new APIError_1.APIError('User not found', 404, true);
                const isMatch = yield user.comparePassword(password);
                if (!isMatch)
                    throw new APIError_1.APIError('Invalid credentials', 401, true);
                return user;
            }
            catch (error) {
                throw new APIError_1.APIError(error.message, 500, false);
            }
        });
    }
}
exports.UserService = UserService;

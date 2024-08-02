"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authUtil_1 = require("./../utils/authUtil");
class LoginModel {
    static authenticateUser(username, password) {
        const placeholderUser = {
            userName: 'Lucia',
            password: '12345'
        };
        if (username === placeholderUser.userName && password === placeholderUser.password) {
            const token = (0, authUtil_1.generateAccessToken)(placeholderUser.userName);
            return token;
        }
        else {
            throw new Error('Invalid credentials');
        }
    }
}
exports.default = LoginModel;

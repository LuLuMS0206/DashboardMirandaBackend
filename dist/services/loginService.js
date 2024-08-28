"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var authUtil_1 = require("./../utils/authUtil");
var LoginModel = /** @class */ (function () {
    function LoginModel() {
    }
    LoginModel.authenticateUser = function (username, password) {
        var placeholderUser = {
            userName: 'Lucia',
            password: '12345'
        };
        if (username === placeholderUser.userName && password === placeholderUser.password) {
            var token = (0, authUtil_1.generateAccessToken)(placeholderUser.userName);
            return token;
        }
        else {
            throw new Error('Invalid credentials');
        }
    };
    return LoginModel;
}());
exports.default = LoginModel;

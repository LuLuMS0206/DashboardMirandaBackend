"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessToken = generateAccessToken;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function generateAccessToken(username) {
    var payload = { username: username };
    var token = jsonwebtoken_1.default.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '1h' });
    return token;
}

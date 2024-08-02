"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessToken = generateAccessToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function generateAccessToken(username) {
    const payload = { username };
    const token = jsonwebtoken_1.default.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '1h' });
    return token;
}

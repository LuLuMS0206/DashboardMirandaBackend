"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateTokenMiddleware = authenticateTokenMiddleware;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authenticateTokenMiddleware(req, res, next) {
    var _a;
    var token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        res.sendStatus(401);
        return;
    }
    try {
        jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        next();
    }
    catch (error) {
        console.log('we are here =', error);
        res.sendStatus(403);
    }
}

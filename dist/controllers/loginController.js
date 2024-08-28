"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var loginService_1 = __importDefault(require("./../services/loginService"));
var loginController = express_1.default.Router();
loginController.post('/', function (req, res) {
    try {
        var token = loginService_1.default.authenticateUser(req.body.userName, req.body.password);
        res.json({ token: token });
    }
    catch (error) {
        res.status(401).json({ error: error.message });
    }
});
exports.default = loginController;

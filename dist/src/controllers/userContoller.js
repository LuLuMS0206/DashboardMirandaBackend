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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userServices_1 = require("./../services/userServices");
const userController = express_1.default.Router();
userController.get('/', (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userServices_1.UserService.fetchAll();
        return res.json({ users });
    }
    catch (error) {
        next(error);
    }
}));
userController.get('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const user = yield userServices_1.UserService.fetchOne(id);
        if (user) {
            return res.json({ user });
        }
        else {
            return res.status(404).json({ message: 'User not found' });
        }
    }
    catch (error) {
        next(error);
    }
}));
userController.post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = req.body;
        const user = yield userServices_1.UserService.addUser(newUser);
        return res.status(201).json({ user });
    }
    catch (error) {
        next(error);
    }
}));
userController.delete('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield userServices_1.UserService.removeUser(id);
        return res.status(204).send();
    }
    catch (error) {
        next(error);
    }
}));
userController.put('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const modifiedUser = req.body;
        const user = yield userServices_1.UserService.modifyUser(Object.assign(Object.assign({}, modifiedUser), { _id: id }));
        if (user) {
            return res.json({ user });
        }
        else {
            return res.status(404).json({ message: 'User not found' });
        }
    }
    catch (error) {
        next(error);
    }
}));
exports.default = userController;

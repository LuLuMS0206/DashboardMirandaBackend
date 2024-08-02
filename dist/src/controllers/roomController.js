"use strict";
// import express, { Request, Response, NextFunction } from 'express';
// import { RoomService } from './../services/roomServices'; 
// import { RoomInterface } from './../interfaces/roomInterface';
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
// const roomController = express.Router();
// roomController.get('/', async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
//     try {
//         const rooms = await RoomService.fetchAll();
//         res.json({ rooms });
//     } catch (error) {
//         next(error);
//     }
// });
// roomController.get('/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     try {
//         const id = req.params.id; 
//         const room = await RoomService.fetchOne(id);
//         if (room) {
//             res.json({ room });
//         } else {
//             res.status(404).json({ message: 'Room not found' });
//         }
//     } catch (error) {
//         next(error);
//     }
// });
// roomController.post('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     try {
//         const newRoom = req.body as RoomInterface;
//         const room = await RoomService.addRoom(newRoom);
//         res.status(201).json({ room });
//     } catch (error) {
//         next(error);
//     }
// });
// roomController.delete('/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     try {
//         const id = req.params.id; 
//         await RoomService.removeRoom(id);
//         res.status(204).send();
//     } catch (error) {
//         next(error);
//     }
// });
// roomController.put('/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     try {
//         const id = req.params.id; 
//         const modifiedRoom = req.body as RoomInterface;
//         const room = await RoomService.modifyRoom({ ...modifiedRoom, id });
//         if (room) {
//             res.json({ room });
//         } else {
//             res.status(404).json({ message: 'Room not found' });
//         }
//     } catch (error) {
//         next(error);
//     }
// });
// export default roomController;
const express_1 = __importDefault(require("express"));
const roomServices_1 = require("./../services/roomServices");
const roomController = express_1.default.Router();
roomController.get('/', (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rooms = yield roomServices_1.RoomService.fetchAll();
        res.json({ rooms });
    }
    catch (error) {
        next(error);
    }
}));
roomController.get('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const room = yield roomServices_1.RoomService.fetchOne(id);
        if (room) {
            res.json({ room });
        }
        else {
            res.status(404).json({ message: 'Room not found' });
        }
    }
    catch (error) {
        next(error);
    }
}));
roomController.post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newRoom = req.body;
        const room = yield roomServices_1.RoomService.addRoom(newRoom);
        res.status(201).json({ room });
    }
    catch (error) {
        next(error);
    }
}));
roomController.delete('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield roomServices_1.RoomService.removeRoom(id);
        res.status(204).send();
    }
    catch (error) {
        next(error);
    }
}));
roomController.put('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const modifiedRoom = req.body;
        const room = yield roomServices_1.RoomService.modifyRoom(Object.assign(Object.assign({}, modifiedRoom), { _id: id }));
        if (room) {
            res.json({ room });
        }
        else {
            res.status(404).json({ message: 'Room not found' });
        }
    }
    catch (error) {
        next(error);
    }
}));
exports.default = roomController;

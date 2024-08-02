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
const bookingService_1 = require("./../services/bookingService");
const bookingController = express_1.default.Router();
bookingController.get('/', (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookings = yield bookingService_1.BookingService.fetchAll();
        res.json({ bookings });
    }
    catch (error) {
        next(error);
    }
}));
bookingController.get('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const booking = yield bookingService_1.BookingService.fetchOne(id);
        if (booking) {
            res.json({ booking });
        }
        else {
            res.status(404).json({ message: 'Booking not found' });
        }
    }
    catch (error) {
        next(error);
    }
}));
bookingController.post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newBooking = req.body;
        const booking = yield bookingService_1.BookingService.addBooking(newBooking);
        res.status(201).json({ booking });
    }
    catch (error) {
        next(error);
    }
}));
bookingController.delete('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield bookingService_1.BookingService.removeBooking(id);
        res.status(204).send();
    }
    catch (error) {
        next(error);
    }
}));
bookingController.put('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const modifiedBooking = req.body;
        const booking = yield bookingService_1.BookingService.modifyBooking(Object.assign(Object.assign({}, modifiedBooking), { id }));
        if (booking) {
            res.json({ booking });
        }
        else {
            res.status(404).json({ message: 'Booking not found' });
        }
    }
    catch (error) {
        next(error);
    }
}));
exports.default = bookingController;

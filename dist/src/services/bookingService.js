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
exports.BookingService = void 0;
const APIError_1 = require("./../utils/APIError");
const bookingModel_1 = require("./../models/bookingModel");
class BookingService {
    static fetchOne(bookingId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const booking = yield bookingModel_1.BookingModel.findById(bookingId).exec();
                if (!booking)
                    throw new APIError_1.APIError("Booking not found", 404, true);
                return booking;
            }
            catch (error) {
                throw new APIError_1.APIError(error.message, 500, false);
            }
        });
    }
    static fetchAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bookings = yield bookingModel_1.BookingModel.find().exec();
                return bookings;
            }
            catch (error) {
                throw new APIError_1.APIError(error.message, 500, false);
            }
        });
    }
    static searchBookings(searchTerm) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bookings = yield bookingModel_1.BookingModel.find({ guest: new RegExp(searchTerm, 'i') }).exec();
                return bookings;
            }
            catch (error) {
                throw new APIError_1.APIError(error.message, 500, false);
            }
        });
    }
    static addBooking(newBooking) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const booking = new bookingModel_1.BookingModel(newBooking);
                yield booking.save();
                return booking;
            }
            catch (error) {
                throw new APIError_1.APIError(error.message, 500, false);
            }
        });
    }
    static removeBooking(bookingId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield bookingModel_1.BookingModel.findByIdAndDelete(bookingId).exec();
                if (!result)
                    throw new APIError_1.APIError("Booking not found", 404, true);
            }
            catch (error) {
                throw new APIError_1.APIError(error.message, 500, false);
            }
        });
    }
    static modifyBooking(modifiedBooking) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const booking = yield bookingModel_1.BookingModel.findByIdAndUpdate(modifiedBooking.id, modifiedBooking, { new: true }).exec();
                if (!booking)
                    throw new APIError_1.APIError("Booking not found", 404, true);
                return booking;
            }
            catch (error) {
                throw new APIError_1.APIError(error.message, 500, false);
            }
        });
    }
}
exports.BookingService = BookingService;

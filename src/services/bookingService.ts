

import { Booking } from './../interfaces/bookingInterface';
import { APIError } from './../utils/APIError';
import { BookingModel, BookingDocument } from './../models/bookingModel';

export class BookingService {
    static async fetchOne(bookingId: string): Promise<BookingDocument | null> {
        try {
            const booking = await BookingModel.findById(bookingId).exec();
            if (!booking) throw new APIError("Booking not found", 404, true);
            return booking;
        } catch (error) {
            throw new APIError((error as Error).message, 500, false);
        }
    }

    static async fetchAll(): Promise<BookingDocument[]> {
        try {
            const bookings = await BookingModel.find().exec();
            return bookings;
        } catch (error) {
            throw new APIError((error as Error).message, 500, false);
        }
    }

    static async searchBookings(searchTerm: string): Promise<BookingDocument[]> {
        try {
            const bookings = await BookingModel.find({ guest: new RegExp(searchTerm, 'i') }).exec();
            return bookings;
        } catch (error) {
            throw new APIError((error as Error).message, 500, false);
        }
    }

    static async addBooking(newBooking: Booking): Promise<BookingDocument> {
        try {
            const booking = new BookingModel(newBooking);
            await booking.save();
            return booking;
        } catch (error) {
            throw new APIError((error as Error).message, 500, false);
        }
    }

    static async removeBooking(bookingId: string): Promise<void> {
        try {
            const result = await BookingModel.findByIdAndDelete(bookingId).exec();
            if (!result) throw new APIError("Booking not found", 404, true);
        } catch (error) {
            throw new APIError((error as Error).message, 500, false);
        }
    }

    static async modifyBooking(modifiedBooking: Booking): Promise<BookingDocument | null> {
        try {
            const booking = await BookingModel.findByIdAndUpdate(modifiedBooking.id, modifiedBooking, { new: true }).exec();
            if (!booking) throw new APIError("Booking not found", 404, true);
            return booking;
        } catch (error) {
            throw new APIError((error as Error).message, 500, false);
        }
    }
}


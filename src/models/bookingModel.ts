import mongoose, { Schema, Document } from "mongoose";
import { Booking } from "./../interfaces/bookingInterface";

export interface BookingDocument extends Document {
    guest: string;
    checkIn: string;
    checkOut: string;
    roomType: string;
    specialRequest: string;
    status: string;
    orderDate: string;
}

const Booking: Schema<BookingDocument> = new Schema({
    guest: { type: String, required: true },
    checkIn: { type: String, required: true },
    checkOut: { type: String, required: true },
    roomType: { type: String, required: true },
    specialRequest: { type: String, required: true },
    status: { type: String, required: true },
    orderDate: { type: String, required: true },
});

export const BookingModel = mongoose.model<BookingDocument>('BookingModel', Booking, 'bookings');

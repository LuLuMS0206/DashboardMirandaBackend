import mongoose, { Schema } from "mongoose";
import {Booking} from "./../interfaces/bookingInterface";

const Booking = new Schema <Booking> ({
    guest: { type: String, required: true },
    checkIn: { type: String, required: true },
    checkOut: { type: String, required: true },
    roomType: { type: String, required: true },
    specialRequest: { type: String, required: true },
    status: { type: String, required: true },
    orderDate: { type: String, required: true },
})

export const BookingModel = mongoose.model<Booking>('BookingModel', Booking, 'bookings');
import mongoose, { Document, Schema } from 'mongoose';
export type statusType = "In progress" | "Check In" | "Check Out";

export interface BookingDocument extends Document {
    guest: string;
    checkIn: string;
    checkOut: string;
    roomType: string;
    specialRequest: string;
    status: statusType;
    orderDate: string;
}

const bookingSchema = new Schema<BookingDocument>({
    guest: { type: String, required: true },
    checkIn: { type: String, required: true },
    checkOut: { type: String, required: true },
    roomType: { type: String, required: true },
    specialRequest: { type: String },
    status: { type: String, enum: ["In progress", "Check In", "Check Out"], required: true },
    orderDate: { type: String, required: true }
});

export const BookingModel = mongoose.model<BookingDocument>('Booking', bookingSchema);

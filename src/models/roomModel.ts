
import mongoose, { Schema, Document } from 'mongoose';
import { RoomInterface } from './../interfaces/roomInterface';

export interface RoomDocument extends Document {
    image: string;
    roomNumber: string;
    roomType: string;
    amenities: string[];
    price: number;
    offerPrice: number;
    status: string;
    availability: string;
}

const RoomInterface: Schema<RoomDocument> = new Schema({
    image: { type: String, required: true },
    roomNumber: { type: String, required: true },
    roomType: { type: String, required: true },
    amenities: [{ type: String, required: true }],
    price: { type: Number, required: true },
    offerPrice: { type: Number, required: true },
    status: { type: String, required: true },
    availability: { type: String, required: true },
});

export const RoomModel = mongoose.model<RoomDocument>('Room', RoomInterface, 'rooms');

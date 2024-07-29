import mongoose, { Schema } from "mongoose";
import {RoomInterface} from "./../interfaces/roomInterface";

const RoomInterface = new Schema <RoomInterface> ({
    image: { type: String, required: true },
    roomNumber:  { type: String, required: true },
    roomType:  { type: String, required: true },
    amenities: [{ type: String, required: true }],
    price:  { type: Number, required: true },
    offerPrice:  { type: Number, required: true },
    status:  { type: String, required: true },
    availability:  { type: String, required: true },
})

export const RoomModel = mongoose.model<RoomInterface>('RoomModel', RoomInterface, 'rooms');

import { RoomInterface } from './../interfaces/roomInterface';
import { RoomModel, RoomDocument } from '../models/roomModel';
import { APIError } from './../utils/APIError';

export class RoomService {
    static async fetchAll(): Promise<RoomDocument[]> {
        try {
            return await RoomModel.find().exec();
        } catch (error) {
            throw new APIError((error as Error).message, 500, false);
        }
    }

    static async fetchOne(roomId: string): Promise<RoomDocument | null> {
        try {
            const room = await RoomModel.findOne({ _id: roomId }).exec();
            if (!room) throw new APIError('Room not found', 404, true);
            return room;
        } catch (error) {
            throw new APIError((error as Error).message, 500, false);
        }
    }

    static async addRoom(newRoom: RoomInterface): Promise<RoomDocument> {
        try {
            const room = new RoomModel(newRoom);
            await room.save();
            return room;
        } catch (error) {
            throw new APIError((error as Error).message, 500, false);
        }
    }

    static async removeRoom(roomId: string): Promise<void> {
        try {
            const result = await RoomModel.findByIdAndDelete(roomId).exec();
            if (!result) throw new APIError('Room not found', 404, true);
        } catch (error) {
            throw new APIError((error as Error).message, 500, false);
        }
    }

    static async modifyRoom(modifiedRoom: RoomInterface & { _id: string }): Promise<RoomDocument | null> {
        try {
            const room = await RoomModel.findByIdAndUpdate(modifiedRoom._id, modifiedRoom, { new: true }).exec();
            if (!room) throw new APIError('Room not found', 404, true);
            return room;
        } catch (error) {
            throw new APIError((error as Error).message, 500, false);
        }
    }

    static async searchRooms(searchTerm: string): Promise<RoomDocument[]> {
        try {
            return await RoomModel.find({
                $or: [
                    { roomType: { $regex: searchTerm, $options: 'i' } },
                    { amenities: { $elemMatch: { $regex: searchTerm, $options: 'i' } } }
                ]
            }).exec();
        } catch (error) {
            throw new APIError((error as Error).message, 500, false);
        }
    }
}

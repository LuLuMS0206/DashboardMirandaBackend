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
exports.RoomService = void 0;
const roomModel_1 = require("../models/roomModel");
const APIError_1 = require("./../utils/APIError");
class RoomService {
    static fetchAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield roomModel_1.RoomModel.find().exec();
            }
            catch (error) {
                throw new APIError_1.APIError(error.message, 500, false);
            }
        });
    }
    static fetchOne(roomId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const room = yield roomModel_1.RoomModel.findOne({ _id: roomId }).exec();
                if (!room)
                    throw new APIError_1.APIError('Room not found', 404, true);
                return room;
            }
            catch (error) {
                throw new APIError_1.APIError(error.message, 500, false);
            }
        });
    }
    static addRoom(newRoom) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const room = new roomModel_1.RoomModel(newRoom);
                yield room.save();
                return room;
            }
            catch (error) {
                throw new APIError_1.APIError(error.message, 500, false);
            }
        });
    }
    static removeRoom(roomId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield roomModel_1.RoomModel.findByIdAndDelete(roomId).exec();
                if (!result)
                    throw new APIError_1.APIError('Room not found', 404, true);
            }
            catch (error) {
                throw new APIError_1.APIError(error.message, 500, false);
            }
        });
    }
    static modifyRoom(modifiedRoom) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const room = yield roomModel_1.RoomModel.findByIdAndUpdate(modifiedRoom._id, modifiedRoom, { new: true }).exec();
                if (!room)
                    throw new APIError_1.APIError('Room not found', 404, true);
                return room;
            }
            catch (error) {
                throw new APIError_1.APIError(error.message, 500, false);
            }
        });
    }
    static searchRooms(searchTerm) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield roomModel_1.RoomModel.find({
                    $or: [
                        { roomType: { $regex: searchTerm, $options: 'i' } },
                        { amenities: { $elemMatch: { $regex: searchTerm, $options: 'i' } } }
                    ]
                }).exec();
            }
            catch (error) {
                throw new APIError_1.APIError(error.message, 500, false);
            }
        });
    }
}
exports.RoomService = RoomService;

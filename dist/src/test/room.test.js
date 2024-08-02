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
const supertest_1 = __importDefault(require("supertest"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app_1 = require("../app");
const roomServices_1 = require("../services/roomServices");
const rooms_1 = require("../data/rooms");
jest.mock('../services/roomServices');
describe('Rooms API', () => {
    let token;
    beforeAll(() => {
        token = jsonwebtoken_1.default.sign({ username: 'admin' }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
    });
    it('should return 401 for requests without token', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.app).get('/rooms');
        expect(res.status).toBe(401);
    }));
    it('should return an array of room instances', () => __awaiter(void 0, void 0, void 0, function* () {
        roomServices_1.RoomModel.fetchAll.mockReturnValue(rooms_1.roomDataList);
        const res = yield (0, supertest_1.default)(app_1.app)
            .get('/rooms')
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'application/json');
        expect(res.status).toBe(200);
        expect(res.body).toMatchObject({ rooms: rooms_1.roomDataList });
    }));
    it('should return a single room instance', () => __awaiter(void 0, void 0, void 0, function* () {
        const roomId = rooms_1.roomDataList[0].id;
        roomServices_1.RoomModel.fetchOne.mockReturnValue(new roomServices_1.RoomModel(rooms_1.roomDataList.find(room => room.id === roomId)));
        const res = yield (0, supertest_1.default)(app_1.app)
            .get(`/rooms/${roomId}`)
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'application/json');
        expect(res.status).toBe(200);
        expect(res.body).toMatchObject({ room: rooms_1.roomDataList.find(room => room.id === roomId) });
    }));
    it('should add a new room', () => __awaiter(void 0, void 0, void 0, function* () {
        const newRoom = {
            id: 'ROOM109',
            image: 'https://example.com/new-room.jpg',
            roomNumber: '109',
            roomType: 'Deluxe',
            amenities: ['WiFi', 'Air Conditioning', 'TV', 'Mini Bar'],
            price: 160,
            offerPrice: 140,
            status: 'Available',
            availability: 'available',
        };
        roomServices_1.RoomModel.addRoom.mockImplementation((room) => {
            rooms_1.roomDataList.push(room);
        });
        const res = yield (0, supertest_1.default)(app_1.app)
            .post('/rooms')
            .send(newRoom)
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'application/json');
        expect(res.status).toBe(201);
        expect(res.body).toMatchObject({ room: newRoom });
    }));
    it('should delete a room', () => __awaiter(void 0, void 0, void 0, function* () {
        const roomId = rooms_1.roomDataList[0].id;
        roomServices_1.RoomModel.removeRoom.mockReturnValue(rooms_1.roomDataList.filter(room => room.id !== roomId));
        const res = yield (0, supertest_1.default)(app_1.app)
            .delete('/rooms')
            .send({ id: roomId })
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'application/json');
        expect(res.status).toBe(200);
        expect(res.body).toMatchObject({ rooms: rooms_1.roomDataList.filter(room => room.id !== roomId) });
    }));
    it('should update a room', () => __awaiter(void 0, void 0, void 0, function* () {
        const roomId = rooms_1.roomDataList[0].id;
        const updatedRoom = Object.assign(Object.assign({}, rooms_1.roomDataList[0]), { roomType: 'Updated Room Type' });
        roomServices_1.RoomModel.modifyRoom.mockReturnValue(rooms_1.roomDataList.map(room => room.id === roomId ? updatedRoom : room));
        const res = yield (0, supertest_1.default)(app_1.app)
            .put(`/rooms/${roomId}`)
            .send(updatedRoom)
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'application/json');
        expect(res.status).toBe(200);
        expect(res.body).toMatchObject({ room: updatedRoom });
    }));
});

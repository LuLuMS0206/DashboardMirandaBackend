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
const app_1 = require("../app");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bookings_1 = require("./../data/bookings");
if (!process.env.TOKEN_SECRET) {
    throw new Error('TOKEN_SECRET is not defined in environment variables');
}
const token = jsonwebtoken_1.default.sign({ userName: 'Lucia' }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
describe('Bookings API', () => {
    it('should return 401 for requests without token', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.app).get('/bookings');
        expect(res.statusCode).toEqual(401);
    }));
    it('should return list of bookings for authenticated requests', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.app)
            .get('/bookings')
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body).toEqual(bookings_1.bookingDataList);
    }));
});

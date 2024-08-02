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
const userServices_1 = require("./../services/userServices");
const users_1 = require("./../data/users");
describe('Users API', () => {
    let token;
    beforeAll(() => {
        token = jsonwebtoken_1.default.sign({ username: 'admin' }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
    });
    it('should return 401 for requests without token', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.app).get('/users');
        expect(res.status).toBe(401);
    }));
    it('should return an array of user instances', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.app)
            .get('/users')
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'application/json');
        expect(res.status).toBe(200);
        expect(res.body).toMatchObject({ users: userServices_1.UserService.fetchAll() });
    }));
    it('should return a single user instance', () => __awaiter(void 0, void 0, void 0, function* () {
        const userId = users_1.userDataList[0].id;
        const res = yield (0, supertest_1.default)(app_1.app)
            .get(`/users/${userId}`)
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'application/json');
        expect(res.status).toBe(200);
        expect(res.body).toMatchObject({ user: userServices_1.UserService.fetchOne(userId) });
    }));
    it('should add a new user', () => __awaiter(void 0, void 0, void 0, function* () {
        const newUser = {
            id: 'user123',
            name: 'Jane Doe',
            email: 'jane.doe@example.com',
            startDate: '2024-07-24',
            description: 'New user in the system',
            contact: '123-456-7890',
            status: 'ACTIVE',
            foto: 'https://example.com/jane.jpg',
        };
        userServices_1.UserService.addUser.mockImplementation((user) => {
            users_1.userDataList.push(user);
        });
        const res = yield (0, supertest_1.default)(app_1.app)
            .post('/users')
            .send(newUser)
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'application/json');
        expect(res.status).toBe(201);
        expect(res.body).toMatchObject({ user: newUser });
    }));
    it('should delete a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const userId = users_1.userDataList[0].id;
        const res = yield (0, supertest_1.default)(app_1.app)
            .delete('/users')
            .send({ id: userId })
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'application/json');
        expect(res.status).toBe(200);
        expect(res.body).toMatchObject({ users: userServices_1.UserService.removeUser(userId) });
    }));
    it('should update a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const userId = users_1.userDataList[0].id;
        const updatedUser = Object.assign(Object.assign({}, users_1.userDataList[0]), { name: 'Updated Name' });
        const res = yield (0, supertest_1.default)(app_1.app)
            .put(`/users/${userId}`)
            .send(updatedUser)
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'application/json');
        expect(res.status).toBe(200);
        expect(res.body).toMatchObject({ users: userServices_1.UserService.modifyUser(updatedUser) });
    }));
});

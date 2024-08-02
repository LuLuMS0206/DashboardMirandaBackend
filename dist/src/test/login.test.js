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
const request = require('supertest');
const { app } = require('../app');
describe("Authentication tests", () => {
    it('El middleware de autenticación niega las solicitudes de los usuarios que no han iniciado sesión', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request(app)
            .get('/bookings');
        expect(res.status).toBe(401);
    }));
    it('El middleware de autenticación niega las solicitudes de los usuarios si las credenciales no son correctas', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request(app)
            .post('/login')
            .send({
            "username": "Pepe",
            "password": "Botica"
        })
            .set("Content-Type", "application/json");
        expect(res.status).toBe(401);
    }));
});

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
const contactServices_1 = require("./../services/contactServices");
const contacts_1 = require("../data/contacts");
describe('Contacts API', () => {
    let token;
    beforeAll(() => {
        token = jsonwebtoken_1.default.sign({ username: 'admin' }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
    });
    it('should return 401 for requests without token', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.app).get('/contacts');
        expect(res.status).toBe(401);
    }));
    it('should return an array of contact instances', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.app)
            .get('/contacts')
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'application/json');
        expect(res.status).toBe(200);
        expect(res.body).toMatchObject({ contacts: contactServices_1.ContactService.fetchAll() });
    }));
    it('should return a single contact instance', () => __awaiter(void 0, void 0, void 0, function* () {
        const contactId = contacts_1.contactDataList[0].id;
        const res = yield (0, supertest_1.default)(app_1.app)
            .get(`/contacts/${contactId}`)
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'application/json');
        expect(res.status).toBe(200);
        expect(res.body).toMatchObject({ contact: contactServices_1.ContactService.fetchOne(contactId) });
    }));
    it('should add a new contact', () => __awaiter(void 0, void 0, void 0, function* () {
        const newContact = {
            id: 10,
            date: '2024-07-24',
            client: {
                name: 'John Doe',
                email: 'john.doe@example.com',
                phone: '123-456-7890'
            },
            subject: 'Inquiry',
            comment: 'Looking for availability.',
            status: 'public',
        };
        contactServices_1.ContactService.addContact.mockImplementation((contact) => {
            contacts_1.contactDataList.push(contact);
        });
        const res = yield (0, supertest_1.default)(app_1.app)
            .post('/contacts')
            .send(newContact)
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'application/json');
        expect(res.status).toBe(201);
        expect(res.body).toMatchObject({ contact: newContact });
    }));
    it('should delete a contact', () => __awaiter(void 0, void 0, void 0, function* () {
        const contactId = contacts_1.contactDataList[0].id;
        const res = yield (0, supertest_1.default)(app_1.app)
            .delete('/contacts')
            .send({ id: contactId })
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'application/json');
        expect(res.status).toBe(200);
        expect(res.body).toMatchObject({ contacts: contactServices_1.ContactService.removeContact(contactId) });
    }));
    it('should update a contact', () => __awaiter(void 0, void 0, void 0, function* () {
        const contactId = contacts_1.contactDataList[0].id;
        const updatedContact = Object.assign(Object.assign({}, contacts_1.contactDataList[0]), { subject: 'Updated Subject' });
        const res = yield (0, supertest_1.default)(app_1.app)
            .put(`/contacts/${contactId}`)
            .send(updatedContact)
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'application/json');
        expect(res.status).toBe(200);
        expect(res.body).toMatchObject({ contacts: contactServices_1.ContactService.modifyContact(updatedContact) });
    }));
});

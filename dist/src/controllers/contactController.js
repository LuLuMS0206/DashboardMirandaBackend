"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contactServices_1 = require("./../services/contactServices");
const contactController = express_1.default.Router();
contactController.get('/', (_req, res, next) => {
    try {
        const contacts = contactServices_1.ContactService.fetchAll();
        return res.json(contacts);
    }
    catch (error) {
        next(error);
    }
});
contactController.get('/:id', (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const contact = contactServices_1.ContactService.fetchOne(id);
        return res.json(contact);
    }
    catch (error) {
        next(error);
    }
});
contactController.post('/', (req, res, next) => {
    try {
        const newContact = req.body;
        contactServices_1.ContactService.addContact(newContact);
        return res.json(newContact);
    }
    catch (error) {
        next(error);
    }
});
contactController.delete('/:id', (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const updatedContacts = contactServices_1.ContactService.removeContact(id);
        return res.json(updatedContacts);
    }
    catch (error) {
        next(error);
    }
});
contactController.put('/:id', (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const modifiedContact = req.body;
        const updatedContacts = contactServices_1.ContactService.modifyContact(Object.assign(Object.assign({}, modifiedContact), { id }));
        return res.json(updatedContacts);
    }
    catch (error) {
        next(error);
    }
});
exports.default = contactController;

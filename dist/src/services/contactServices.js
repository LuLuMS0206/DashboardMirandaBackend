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
exports.ContactService = void 0;
const APIError_1 = require("./../utils/APIError");
const contactModel_1 = require("../models/contactModel");
class ContactService {
    static fetchAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield contactModel_1.ContactModel.find().exec();
            }
            catch (error) {
                throw new APIError_1.APIError(error.message, 500, false);
            }
        });
    }
    static fetchOne(contactId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contact = yield contactModel_1.ContactModel.findOne({ id: contactId }).exec();
                if (!contact)
                    throw new APIError_1.APIError('Contact not found', 404, true);
                return contact;
            }
            catch (error) {
                throw new APIError_1.APIError(error.message, 500, false);
            }
        });
    }
    static addContact(newContact) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contact = new contactModel_1.ContactModel(Object.assign(Object.assign({}, newContact), { id: newContact.id }));
                yield contact.save();
                return contact;
            }
            catch (error) {
                throw new APIError_1.APIError(error.message, 500, false);
            }
        });
    }
    static removeContact(contactId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield contactModel_1.ContactModel.findOneAndDelete({ id: contactId }).exec();
                if (!result)
                    throw new APIError_1.APIError('Contact not found', 404, true);
            }
            catch (error) {
                throw new APIError_1.APIError(error.message, 500, false);
            }
        });
    }
    static modifyContact(modifiedContact) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contact = yield contactModel_1.ContactModel.findOneAndUpdate({ id: modifiedContact.id }, modifiedContact, { new: true }).exec();
                if (!contact)
                    throw new APIError_1.APIError('Contact not found', 404, true);
                return contact;
            }
            catch (error) {
                throw new APIError_1.APIError(error.message, 500, false);
            }
        });
    }
}
exports.ContactService = ContactService;

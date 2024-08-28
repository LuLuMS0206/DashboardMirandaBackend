"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var contactServices_1 = require("./../services/contactServices");
var contactController = express_1.default.Router();
contactController.get('/', function (_req, res, next) {
    try {
        var contacts = contactServices_1.ContactService.fetchAll();
        return res.json(contacts);
    }
    catch (error) {
        next(error);
    }
});
contactController.get('/:id', function (req, res, next) {
    try {
        var id = parseInt(req.params.id);
        var contact = contactServices_1.ContactService.fetchOne(id);
        return res.json(contact);
    }
    catch (error) {
        next(error);
    }
});
contactController.post('/', function (req, res, next) {
    try {
        var newContact = req.body;
        contactServices_1.ContactService.addContact(newContact);
        return res.json(newContact);
    }
    catch (error) {
        next(error);
    }
});
contactController.delete('/:id', function (req, res, next) {
    try {
        var id = parseInt(req.params.id);
        var updatedContacts = contactServices_1.ContactService.removeContact(id);
        return res.json(updatedContacts);
    }
    catch (error) {
        next(error);
    }
});
contactController.put('/:id', function (req, res, next) {
    try {
        var id = parseInt(req.params.id);
        var modifiedContact = req.body;
        var updatedContacts = contactServices_1.ContactService.modifyContact(__assign(__assign({}, modifiedContact), { id: id }));
        return res.json(updatedContacts);
    }
    catch (error) {
        next(error);
    }
});
exports.default = contactController;

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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactService = void 0;
var APIError_1 = require("./../utils/APIError");
var contactModel_1 = require("../models/contactModel");
var ContactService = /** @class */ (function () {
    function ContactService() {
    }
    ContactService.fetchAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, contactModel_1.ContactModel.find().exec()];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        error_1 = _a.sent();
                        throw new APIError_1.APIError(error_1.message, 500, false);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ContactService.fetchOne = function (contactId) {
        return __awaiter(this, void 0, void 0, function () {
            var contact, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, contactModel_1.ContactModel.findOne({ id: contactId }).exec()];
                    case 1:
                        contact = _a.sent();
                        if (!contact)
                            throw new APIError_1.APIError('Contact not found', 404, true);
                        return [2 /*return*/, contact];
                    case 2:
                        error_2 = _a.sent();
                        throw new APIError_1.APIError(error_2.message, 500, false);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ContactService.addContact = function (newContact) {
        return __awaiter(this, void 0, void 0, function () {
            var contact, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        contact = new contactModel_1.ContactModel(__assign(__assign({}, newContact), { id: newContact.id }));
                        return [4 /*yield*/, contact.save()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, contact];
                    case 2:
                        error_3 = _a.sent();
                        throw new APIError_1.APIError(error_3.message, 500, false);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ContactService.removeContact = function (contactId) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, contactModel_1.ContactModel.findOneAndDelete({ id: contactId }).exec()];
                    case 1:
                        result = _a.sent();
                        if (!result)
                            throw new APIError_1.APIError('Contact not found', 404, true);
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _a.sent();
                        throw new APIError_1.APIError(error_4.message, 500, false);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ContactService.modifyContact = function (modifiedContact) {
        return __awaiter(this, void 0, void 0, function () {
            var contact, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, contactModel_1.ContactModel.findOneAndUpdate({ id: modifiedContact.id }, modifiedContact, { new: true }).exec()];
                    case 1:
                        contact = _a.sent();
                        if (!contact)
                            throw new APIError_1.APIError('Contact not found', 404, true);
                        return [2 /*return*/, contact];
                    case 2:
                        error_5 = _a.sent();
                        throw new APIError_1.APIError(error_5.message, 500, false);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return ContactService;
}());
exports.ContactService = ContactService;

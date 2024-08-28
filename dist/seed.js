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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var faker_1 = require("@faker-js/faker");
var bookingModel_1 = require("./models/bookingModel");
var roomModel_1 = require("./models/roomModel");
var userModel_1 = require("./models/userModel");
var contactModel_1 = require("./models/contactModel");
function seedDatabase() {
    return __awaiter(this, void 0, void 0, function () {
        var error_1, i, bookingModel, i, roomModel, i, userModel, i, contactModel;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, mongoose_1.default.connect("mongodb+srv://luciamacho00:wtNqhbB03R7ZFY2w@cluster0.qavfymp.mongodb.net/mirandaMongo")];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error(error_1);
                    process.exit(1);
                    return [3 /*break*/, 3];
                case 3: return [4 /*yield*/, bookingModel_1.BookingModel.deleteMany({})];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, roomModel_1.RoomModel.deleteMany({})];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, userModel_1.UserModel.deleteMany({})];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, contactModel_1.ContactModel.deleteMany({})];
                case 7:
                    _a.sent();
                    i = 0;
                    _a.label = 8;
                case 8:
                    if (!(i < 10)) return [3 /*break*/, 11];
                    bookingModel = new bookingModel_1.BookingModel({
                        guest: faker_1.faker.person.fullName(),
                        checkIn: faker_1.faker.date.future().toISOString(),
                        checkOut: faker_1.faker.date.future().toISOString(),
                        roomType: faker_1.faker.helpers.arrayElement(['Single', 'Double', 'Suite']),
                        specialRequest: faker_1.faker.lorem.sentence(),
                        status: faker_1.faker.helpers.arrayElement(['Check In', 'Check Out', 'In Progress']),
                        orderDate: faker_1.faker.date.past().toISOString()
                    });
                    return [4 /*yield*/, bookingModel.save()];
                case 9:
                    _a.sent();
                    console.log('bookingSaved');
                    _a.label = 10;
                case 10:
                    i++;
                    return [3 /*break*/, 8];
                case 11:
                    ;
                    i = 0;
                    _a.label = 12;
                case 12:
                    if (!(i < 10)) return [3 /*break*/, 15];
                    roomModel = new roomModel_1.RoomModel({
                        image: faker_1.faker.image.url(),
                        roomNumber: faker_1.faker.string.uuid(),
                        roomType: faker_1.faker.helpers.arrayElement(['Single', 'Double', 'Suite']),
                        amenities: faker_1.faker.helpers.arrayElements(['WiFi', 'TV', 'Air Conditioning', 'Mini Bar'], 3),
                        price: faker_1.faker.number.int({ min: 50, max: 500 }),
                        offerPrice: faker_1.faker.number.int({ min: 40, max: 450 }),
                        status: faker_1.faker.helpers.arrayElement(['Available', 'Occupied']),
                        availability: faker_1.faker.helpers.arrayElement(['Morning', 'Evening', 'Night'])
                    });
                    return [4 /*yield*/, roomModel.save()];
                case 13:
                    _a.sent();
                    console.log('roomSaved');
                    _a.label = 14;
                case 14:
                    i++;
                    return [3 /*break*/, 12];
                case 15:
                    ;
                    i = 0;
                    _a.label = 16;
                case 16:
                    if (!(i < 10)) return [3 /*break*/, 19];
                    userModel = new userModel_1.UserModel({
                        name: faker_1.faker.person.fullName(),
                        email: faker_1.faker.internet.email(),
                        startDate: faker_1.faker.date.past().toISOString(),
                        description: faker_1.faker.lorem.sentence(),
                        contact: faker_1.faker.phone.number(),
                        status: faker_1.faker.helpers.arrayElement(['ACTIVE', 'INACTIVE']),
                        foto: faker_1.faker.image.avatar(),
                        password: faker_1.faker.internet.password()
                    });
                    return [4 /*yield*/, userModel.save()];
                case 17:
                    _a.sent();
                    console.log('userSaved');
                    _a.label = 18;
                case 18:
                    i++;
                    return [3 /*break*/, 16];
                case 19:
                    ;
                    i = 0;
                    _a.label = 20;
                case 20:
                    if (!(i < 10)) return [3 /*break*/, 23];
                    contactModel = new contactModel_1.ContactModel({
                        date: faker_1.faker.date.past().toISOString(),
                        client: {
                            name: faker_1.faker.person.fullName(),
                            email: faker_1.faker.internet.email(),
                            phone: faker_1.faker.phone.number()
                        },
                        subject: faker_1.faker.lorem.words(),
                        comment: faker_1.faker.lorem.sentences(),
                        status: faker_1.faker.helpers.arrayElement(['public', 'archived'])
                    });
                    return [4 /*yield*/, contactModel.save()];
                case 21:
                    _a.sent();
                    console.log('contactSaved');
                    _a.label = 22;
                case 22:
                    i++;
                    return [3 /*break*/, 20];
                case 23:
                    ;
                    console.log('Database seeded!');
                    mongoose_1.default.connection.close();
                    return [2 /*return*/];
            }
        });
    });
}
seedDatabase().catch(function (err) {
    console.error('Error seeding database:', err);
    mongoose_1.default.connection.close();
});

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
const mongoose_1 = __importDefault(require("mongoose"));
const faker_1 = require("@faker-js/faker");
const bookingModel_1 = require("./models/bookingModel");
const roomModel_1 = require("./models/roomModel");
const userModel_1 = require("./models/userModel");
const contactModel_1 = require("./models/contactModel");
const connectDB_1 = require("../connectDB");
function seedDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('before');
        yield (0, connectDB_1.connectDB)();
        console.log('after');
        yield bookingModel_1.BookingModel.deleteMany({});
        yield roomModel_1.RoomModel.deleteMany({});
        yield userModel_1.UserModel.deleteMany({});
        yield contactModel_1.ContactModel.deleteMany({});
        for (let i = 0; i < 10; i++) {
            const bookingModel = new bookingModel_1.BookingModel({
                guest: faker_1.faker.person.fullName(),
                checkIn: faker_1.faker.date.future().toISOString(),
                checkOut: faker_1.faker.date.future().toISOString(),
                roomType: faker_1.faker.helpers.arrayElement(['Single', 'Double', 'Suite']),
                specialRequest: faker_1.faker.lorem.sentence(),
                status: faker_1.faker.helpers.arrayElement(['Confirmed', 'Pending', 'Cancelled']),
                orderDate: faker_1.faker.date.past().toISOString()
            });
            yield bookingModel.save();
            console.log('bookingSaved');
        }
        ;
        for (let i = 0; i < 10; i++) {
            const roomModel = new roomModel_1.RoomModel({
                image: faker_1.faker.image.url(),
                roomNumber: faker_1.faker.string.uuid(),
                roomType: faker_1.faker.helpers.arrayElement(['Single', 'Double', 'Suite']),
                amenities: faker_1.faker.helpers.arrayElements(['WiFi', 'TV', 'Air Conditioning', 'Mini Bar'], 3),
                price: faker_1.faker.number.int({ min: 50, max: 500 }),
                offerPrice: faker_1.faker.number.int({ min: 40, max: 450 }),
                status: faker_1.faker.helpers.arrayElement(['Available', 'Occupied']),
                availability: faker_1.faker.helpers.arrayElement(['Morning', 'Evening', 'Night'])
            });
            yield roomModel.save();
            console.log('roomSaved');
        }
        ;
        for (let i = 0; i < 10; i++) {
            const userModel = new userModel_1.UserModel({
                name: faker_1.faker.person.fullName(),
                email: faker_1.faker.internet.email(),
                startDate: faker_1.faker.date.past().toISOString(),
                description: faker_1.faker.lorem.sentence(),
                contact: faker_1.faker.phone.number(),
                status: faker_1.faker.helpers.arrayElement(['ACTIVE', 'INACTIVE']),
                foto: faker_1.faker.image.avatar(),
                password: faker_1.faker.internet.password()
            });
            yield userModel.save();
            console.log('userSaved');
        }
        ;
        for (let i = 0; i < 10; i++) {
            const contactModel = new contactModel_1.ContactModel({
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
            yield contactModel.save();
            console.log('contactSaved');
        }
        ;
        console.log('Database seeded!');
        mongoose_1.default.connection.close();
    });
}
seedDatabase().catch(err => {
    console.error('Error seeding database:', err);
    mongoose_1.default.connection.close();
});

import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
import { BookingModel } from './models/bookingModel';
import { RoomModel } from './models/roomModel';
import { UserModel } from './models/userModel';
import { ContactModel } from './models/contactModel';
import { connectDB } from '../connectDB'; 

async function seedDatabase() {
    console.log('before');
    await connectDB();
    console.log('after');
    
    await BookingModel.deleteMany({});
    await RoomModel.deleteMany({});
    await UserModel.deleteMany({});
    await ContactModel.deleteMany({});

    for (let i = 0; i < 10; i++) {
        const bookingModel = new BookingModel({
            guest: faker.person.fullName(),
            checkIn: faker.date.future().toISOString(),
            checkOut: faker.date.future().toISOString(),
            roomType: faker.helpers.arrayElement(['Single', 'Double', 'Suite']),
            specialRequest: faker.lorem.sentence(),
            status: faker.helpers.arrayElement(['Check In', 'Check Out', 'In Progress']),
            orderDate: faker.date.past().toISOString()
        });
        await bookingModel.save();
        console.log('bookingSaved');
    };

    for (let i = 0; i < 10; i++) {
        const roomModel = new RoomModel({
            image: faker.image.url(),
            roomNumber: faker.string.uuid(),
            roomType: faker.helpers.arrayElement(['Single', 'Double', 'Suite']),
            amenities: faker.helpers.arrayElements(['WiFi', 'TV', 'Air Conditioning', 'Mini Bar'], 3),
            price: faker.number.int({ min: 50, max: 500 }),
            offerPrice: faker.number.int({ min: 40, max: 450 }),
            status: faker.helpers.arrayElement(['Available', 'Occupied']),
            availability: faker.helpers.arrayElement(['Morning', 'Evening', 'Night'])
        });
        await roomModel.save();
        console.log('roomSaved');
    };

    for (let i = 0; i < 10; i++) {
        const userModel = new UserModel({
            name: faker.person.fullName(),
            email: faker.internet.email(),
            startDate: faker.date.past().toISOString(),
            description: faker.lorem.sentence(),
            contact: faker.phone.number(),
            status: faker.helpers.arrayElement(['ACTIVE', 'INACTIVE']),
            foto: faker.image.avatar(),
            password: faker.internet.password()
        });
        await userModel.save();
        console.log('userSaved');
    };

    for (let i = 0; i < 10; i++) {
        const contactModel = new ContactModel({
            date: faker.date.past().toISOString(),
            client: {
                name: faker.person.fullName(),
                email: faker.internet.email(),
                phone: faker.phone.number()
            },
            subject: faker.lorem.words(),
            comment: faker.lorem.sentences(),
            status: faker.helpers.arrayElement(['public', 'archived'])
        });
        await contactModel.save();
        console.log('contactSaved');
    };

    console.log('Database seeded!');
    mongoose.connection.close();
}

seedDatabase().catch(err => {
    console.error('Error seeding database:', err);
    mongoose.connection.close();
});

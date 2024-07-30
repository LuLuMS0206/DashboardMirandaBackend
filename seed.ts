import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
import { BookingModel } from './src/models/bookingModel';
import { RoomModel } from './src/models/roomModel';
import { UserModel } from './src/models/userModel';
import { ContactModel } from './src/models/contactModel';
import { connectDB } from './connectDB'; 

async function seedDatabase() {
    await connectDB();


    await BookingModel.deleteMany({});
    await RoomModel.deleteMany({});
    await UserModel.deleteMany({});
    await ContactModel.deleteMany({});


    const bookings = Array.from({ length: 10 }).map(() => ({
        guest: faker.person.fullName(),
        checkIn: faker.date.future().toISOString(),
        checkOut: faker.date.future().toISOString(),
        roomType: faker.helpers.arrayElement(['Single', 'Double', 'Suite']),
        specialRequest: faker.lorem.sentence(),
        status: faker.helpers.arrayElement(['Confirmed', 'Pending', 'Cancelled']),
        orderDate: faker.date.past().toISOString()
    }));
    await BookingModel.insertMany(bookings);


    const rooms = Array.from({ length: 10 }).map(() => ({
        image: faker.image.url(),
        roomNumber: faker.string.uuid(),
        roomType: faker.helpers.arrayElement(['Single', 'Double', 'Suite']),
        amenities: faker.helpers.arrayElements(['WiFi', 'TV', 'Air Conditioning', 'Mini Bar'], 3),
        price: faker.number.int({ min: 50, max: 500 }),
        offerPrice: faker.number.int({ min: 40, max: 450 }),
        status: faker.helpers.arrayElement(['Available', 'Occupied']),
        availability: faker.helpers.arrayElement(['Morning', 'Evening', 'Night'])
    }));
    await RoomModel.insertMany(rooms);


    const users = Array.from({ length: 10 }).map(() => ({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        startDate: faker.date.past().toISOString(),
        description: faker.lorem.sentence(),
        contact: faker.phone.number(),
        status: faker.helpers.arrayElement(['ACTIVE', 'INACTIVE']),
        foto: faker.image.avatar(),
        password: faker.internet.password() 
    }));
    await UserModel.insertMany(users);

    
    const contacts = Array.from({ length: 10 }).map(() => ({
        date: faker.date.past().toISOString(),
        client: {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            phone: faker.phone.number()
        },
        subject: faker.lorem.words(),
        comment: faker.lorem.sentences(),
        status: faker.helpers.arrayElement(['public', 'archived'])
    }));
    await ContactModel.insertMany(contacts);

    console.log('Database seeded!');
    mongoose.connection.close();
}

seedDatabase().catch(err => {
    console.error('Error seeding database:', err);
    mongoose.connection.close();
});


import { faker } from '@faker-js/faker';
import { BookingModel } from './models/bookingModel';
import { RoomModel } from './models/roomModel';
import { UserModel } from './models/userModel';
import { ContactModel } from './models/contactModel';
import { connection } from './connectDB';
import { start } from './../src/app';



start()

export const seedDatabase = async () => {

    await connection.query('USE miranda');
    await connection.query('DROP TABLE IF EXISTS bookings');
    await connection.query('DROP TABLE IF EXISTS rooms');
    await connection.query('DROP TABLE IF EXISTS contact');
    await connection.query('DROP TABLE IF EXISTS users');
    await connection.query('DROP TABLE IF EXISTS amenities');

    await connection.query(`
        CREATE TABLE IF NOT EXISTS bookings (
            id INT AUTO_INCREMENT NOT NULL,
            guest VARCHAR(255) NOT NULL,
    checkIn VARCHAR(255) NOT NULL,
    checkOut VARCHAR(255) NOT NULL,
    roomType VARCHAR(255) NOT NULL,
    specialRequest VARCHAR(255),
    status VARCHAR(255) NOT NULL,
    orderDate VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
        )
    `);

    await connection.query(`
        CREATE TABLE IF NOT EXISTS rooms (
         _id INT AUTO_INCREMENT NOT NULL,
    image VARCHAR(255) NOT NULL,
    roomNumber VARCHAR(255) NOT NULL,
    roomType VARCHAR(255) NOT NULL,
    price INT NOT NULL,
    offerPrice INT NOT NULL,
    status VARCHAR(255) NOT NULL,
    availability VARCHAR(255) NOT NULL,
    PRIMARY KEY (_id)
        )
    `);

    await connection.query(`
        CREATE TABLE IF NOT EXISTS contact (
           id INT AUTO_INCREMENT NOT NULL,
    date VARCHAR(255) NOT NULL,
    client_name VARCHAR(255) NOT NULL,
    client_email VARCHAR(255) NOT NULL,
    client_phone VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    comment VARCHAR(255) NOT NULL,
    status ENUM('public', 'archived') NOT NULL,
    PRIMARY KEY (id)
        )
    `);

    await connection.query(`
        CREATE TABLE IF NOT EXISTS users (
           _id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    startDate VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    contact VARCHAR(255) NOT NULL,
    status ENUM('ACTIVE', 'INACTIVE') NOT NULL,
    foto VARCHAR(255) NOT NULL,
    password VARCHAR(255),
    PRIMARY KEY (_id)
        )
    `);

    await connection.query(`
        CREATE TABLE IF NOT EXISTS amenities (
            _id INT AUTO_INCREMENT NOT NULL, 
            name VARCHAR (255) NOT NULL, 
            id_room INT NOT NULL, 
            PRIMARY KEY (_id), 
            FOREIGN KEY(id_room)
 REFERENCES rooms (_id)
        )
    `);


    for (let i = 0; i < 10; i++) {
        const bookingModel = {
            guest: faker.person.fullName(),
            checkIn: faker.date.future().toISOString(),
            checkOut: faker.date.future().toISOString(),
            roomType: faker.helpers.arrayElement(['Single', 'Double', 'Suite']),
            specialRequest: faker.lorem.sentence(),
            status: faker.helpers.arrayElement(['Check In', 'Check Out', 'In Progress']),
            orderDate: faker.date.past().toISOString()
        };
        await connection.query(' INSERT INTO bookings (guest, checkIn, checkOut, roomType, specialRequest, status, orderDate  ) VALUES (?, ?, ?, ?, ?, ?, ?)',        
            [bookingModel.guest, bookingModel.checkIn, bookingModel.checkOut, bookingModel.roomType, bookingModel.specialRequest, bookingModel.status, bookingModel.orderDate]);
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
        await connection.query(' INSERT INTO bookings (image, roomNumber, roomType, amenities, price, offerPrice, status, availability  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',        
            [roomModel.image, roomModel.roomNumber, roomModel.roomType, roomModel.amenities, roomModel.price, roomModel.status, roomModel.offerPrice, roomModel.availability]);
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
        await connection.query(' INSERT INTO bookings (name, email, startDate, description, contact, status, status, foto, password  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',        
            [userModel.name, userModel.email, userModel.startDate, userModel.description, userModel.contact, userModel.status, userModel.foto, userModel.password]);
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
        await connection.query(
            'INSERT INTO bookings (date, clientName, clientEmail, clientPhone, subject, comment, status) VALUES (?, ?, ?, ?, ?, ?, ?)',        
            [
                contactModel.date, 
                contactModel.client.name, 
                contactModel.client.email, 
                contactModel.client.phone, 
                contactModel.subject, 
                contactModel.comment, 
                contactModel.status, 
            ]
        );
        console.log('contactSaved');
    };

}



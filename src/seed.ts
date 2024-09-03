
import { faker } from '@faker-js/faker';
import { connection } from './connectDB';

export const seedDatabase = async () => {
    const sql = `DROP TABLE IF EXISTS amenities, bookings, contacts, rooms, users;`;        
    await connection.query(sql);

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
        const roomModel = {
            image: faker.image.url(),
            roomNumber: faker.string.uuid(),
            roomType: faker.helpers.arrayElement(['Single', 'Double', 'Suite']),
            amenities: faker.helpers.arrayElements(['WiFi', 'TV', 'Air Conditioning', 'Mini Bar'], 3),
            price: faker.number.int({ min: 50, max: 500 }),
            offerPrice: faker.number.int({ min: 40, max: 450 }),
            status: faker.helpers.arrayElement(['Available', 'Occupied']),
            availability: faker.helpers.arrayElement(['Morning', 'Evening', 'Night'])
        };
        await connection.query(' INSERT INTO rooms (roomNumber, roomType, price, offerPrice, status, availability  ) VALUES ( ?, ?, ?, ?, ?, ?)',        
            [roomModel.roomNumber, roomModel.roomType, roomModel.price, roomModel.offerPrice, roomModel.status, roomModel.availability]);
        console.log('roomSaved');
    };

    for (let i = 0; i < 10; i++) {
        const userModel = {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            startDate: faker.date.past().toISOString(),
            description: faker.lorem.sentence(),
            contact: faker.phone.number(),
            status: faker.helpers.arrayElement(['ACTIVE', 'INACTIVE']),
            foto: faker.image.avatar(),
            password: faker.internet.password()
        };
        await connection.query(' INSERT INTO users (name, email, startDate, description, contact, status, foto, password  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',        
            [userModel.name, userModel.email, userModel.startDate, userModel.description, userModel.contact, userModel.status, userModel.foto, userModel.password]);
        console.log('userSaved');
    };

    for (let i = 0; i < 10; i++) {
        const contactModel = {
            date: faker.date.past().toISOString(),
            client: {
                name: faker.person.fullName(),
                email: faker.internet.email(),
                phone: faker.phone.number()
            },
            subject: faker.lorem.words(),
            comment: faker.lorem.words(),
            status: faker.helpers.arrayElement(['public', 'archived'])
        };
        await connection.query(
            'INSERT INTO contact (date, client_name, client_email, client_phone, subject, comment, status) VALUES (?, ?, ?, ?, ?, ?, ?)',        
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

seedDatabase()
connection.end()
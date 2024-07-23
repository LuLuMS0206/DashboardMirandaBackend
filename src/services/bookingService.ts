import { Booking } from './../interfaces/bookingInterface';
import { APIError } from './../utils/APIError';
import {bookingDataList} from './../../src/data/bookings'

export class BookingModel implements Booking {
    id: number;
    guest: string;
    checkIn: string;
    checkOut: string;
    roomType: string;
    specialRequest: string;
    status: string;
    orderDate: string;

    constructor(booking: Booking) {
        this.id = booking.id;
        this.guest = booking.guest;
        this.checkIn = booking.checkIn;
        this.checkOut = booking.checkOut;
        this.roomType = booking.roomType;
        this.specialRequest = booking.specialRequest;
        this.status = booking.status;
        this.orderDate = booking.orderDate;
    }

    static fetchOne(bookingId: number): BookingModel | void {
        const bookingList = bookingDataList as BookingModel[];
        if (!bookingList)
            throw new APIError("There is no bookings data", 500, false);

        const booking = bookingList.find((booking: BookingModel) => booking.id === bookingId);
        if (!booking)
            throw new APIError("Booking not found", 400, true);
        
        return new BookingModel(booking);
    }

    static fetchAll(): BookingModel[] | void {
        const bookingList = bookingDataList as BookingModel[];
        if (!bookingList)
            throw new APIError("There is no bookings data", 500, false);

        return bookingList.map(booking => new BookingModel(booking));
    }

    static searchBookings(searchTerm: string): BookingModel[] | void {
        const bookingList = bookingDataList as BookingModel[];
        if (!bookingList)
            throw new APIError("There is no bookings data", 500, false);

        const filteredBookingList = bookingList.filter((booking: BookingModel) =>
            booking.guest.includes(searchTerm)
        );

        return filteredBookingList.map(booking => new BookingModel(booking));
    }

    static addBooking(newBooking: Booking): void {
        const bookingList = bookingDataList as BookingModel[];
        const booking = new BookingModel(newBooking);
        bookingList.push(booking);
        saveBookings(bookingList);
    }

    static removeBooking(bookingId: number): BookingModel[] {
        let bookingList = bookingDataList as BookingModel[];
        bookingList = bookingList.filter((booking: BookingModel) => booking.id !== bookingId);
        saveBookings(bookingList);
        return bookingList.map(booking => new BookingModel(booking));
    }

    static modifyBooking(modifiedBooking: Booking): BookingModel[] {
        let bookingList = bookingDataList as BookingModel[];
        bookingList = bookingList.map(booking => booking.id === modifiedBooking.id ? new BookingModel(modifiedBooking) : booking);
        saveBookings(bookingList);
        return bookingList.map(booking => new BookingModel(booking));
    }
}

function saveBookings(bookings: BookingModel[]): void {
    const fs = require('fs');
    const path = require('path');
    const dataPath = path.join(__dirname, '../../data/bookings.json');
    try {
        fs.writeFileSync(dataPath, JSON.stringify(bookings, null, 2));
    } catch (err) {
        console.error('Error saving bookings:', err);
    }
}

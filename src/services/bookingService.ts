import fs from 'fs';
import path from 'path';
import {Booking} from './../interfaces/bookingInterface';

const dataPath = path.join(__dirname, '../../data/bookings.json');

let bookings: Booking[] = [];

function loadBookings() {
    try {
        const data = fs.readFileSync(dataPath, 'utf8');
        bookings = JSON.parse(data);
    } catch (err) {
        console.error('Error loading bookings:', err);
    }
}

loadBookings();

export const BookingModel = {
    getBookings: (): Booking[] => bookings,
    getBooking: (id: number): Booking | undefined => bookings.find(booking => booking.id === id),
    addBooking: (newBooking: Booking): void => {
        bookings.push(newBooking);
        saveBookings();
    },
    removeBooking: (id: number): Booking[] => {
        bookings = bookings.filter(booking => booking.id !== id);
        saveBookings();
        return bookings;
    },
    modifyBooking: (modifiedBooking: Booking): Booking[] => {
        bookings = bookings.map(booking => booking.id === modifiedBooking.id ? modifiedBooking : booking);
        saveBookings();
        return bookings;
    }
};

function saveBookings() {
    try {
        fs.writeFileSync(dataPath, JSON.stringify(bookings, null, 2));
    } catch (err) {
        console.error('Error saving bookings:', err);
    }
}

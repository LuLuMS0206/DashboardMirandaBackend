

// import { Booking } from './../interfaces/bookingInterface';
// import { APIError } from './../utils/APIError';
// import { BookingModel, BookingDocument } from './../models/bookingModel';

// export class BookingService {
//     static async fetchOne(bookingId: string): Promise<BookingDocument | null> {
//         try {
//             const booking = await BookingModel.findById(bookingId).exec();
//             if (!booking) throw new APIError("Booking not found", 404, true);
//             return booking;
//         } catch (error) {
//             throw new APIError((error as Error).message, 500, false);
//         }
//     }

//     static async fetchAll(): Promise<BookingDocument[]> {
//         try {
//             const bookings = await BookingModel.find().exec();
//             return bookings;
//         } catch (error) {
//             throw new APIError((error as Error).message, 500, false);
//         }
//     }

//     static async searchBookings(searchTerm: string): Promise<BookingDocument[]> {
//         try {
//             const bookings = await BookingModel.find({ guest: new RegExp(searchTerm, 'i') }).exec();
//             return bookings;
//         } catch (error) {
//             throw new APIError((error as Error).message, 500, false);
//         }
//     }

//     static async addBooking(newBooking: Booking): Promise<BookingDocument> {
//         try {
//             const booking = new BookingModel(newBooking);
//             await booking.save();
//             return booking;
//         } catch (error) {
//             throw new APIError((error as Error).message, 500, false);
//         }
//     }

//     static async removeBooking(bookingId: string): Promise<void> {
//         try {
//             const result = await BookingModel.findByIdAndDelete(bookingId).exec();
//             if (!result) throw new APIError("Booking not found", 404, true);
//         } catch (error) {
//             throw new APIError((error as Error).message, 500, false);
//         }
//     }

//     static async modifyBooking(modifiedBooking: Booking): Promise<BookingDocument | null> {
//         try {
//             const booking = await BookingModel.findByIdAndUpdate(modifiedBooking.id, modifiedBooking, { new: true }).exec();
//             if (!booking) throw new APIError("Booking not found", 404, true);
//             return booking;
//         } catch (error) {
//             throw new APIError((error as Error).message, 500, false);
//         }
//     }
// }


import { Booking } from './../interfaces/bookingInterface';
import { APIError } from './../utils/APIError';
import { connection } from './../connectDB';
import mysql from 'mysql2/promise';

export class BookingService {
    // Ver todos los bookings
    static async fetchAll(): Promise<Booking[]> {
        try {
            const [rows] = await connection.query('SELECT * FROM bookings');
            return rows as Booking[];
        } catch (error) {
            throw new APIError((error as Error).message, 500, false);
        }
    }

    // Ver un booking por ID
    static async fetchOne(bookingId: number): Promise<Booking | null> {
        try {
            const [rows, fields] = await connection.query<mysql.RowDataPacket[]>('SELECT * FROM bookings WHERE id = ?', [bookingId]);
            if (rows.length === 0) throw new APIError('Booking not found', 404, true);
            return rows[0] as Booking;
        } catch (error) {
            throw new APIError((error as Error).message, 500, false);
        }
    }

    // Añadir un nuevo booking
    static async addBooking(newBooking: Booking): Promise<Booking> {
        try {
            const { guest, checkIn, checkOut, roomType, specialRequest, status, orderDate } = newBooking;
            const [result] = await connection.query('INSERT INTO bookings (guest, checkIn, checkOut, roomType, specialRequest, status, orderDate) VALUES (?, ?, ?, ?, ?, ?, ?)', 
                [guest, checkIn, checkOut, roomType, specialRequest, status, orderDate]);
            
            const newId = (result as mysql.ResultSetHeader).insertId;
            return { ...newBooking, id: newId };
        } catch (error) {
            throw new APIError((error as Error).message, 500, false);
        }
    }

    // Eliminar un booking por ID
    static async removeBooking(bookingId: number): Promise<void> {
        try {
            const [result] = await connection.query('DELETE FROM bookings WHERE id = ?', [bookingId]);
            if ((result as mysql.ResultSetHeader).affectedRows === 0) throw new APIError('Booking not found', 404, true);
        } catch (error) {
            throw new APIError((error as Error).message, 500, false);
        }
    }

    // Actualizar un booking
    static async modifyBooking(modifiedBooking: Booking): Promise<Booking | null> {
        try {
            const { id, guest, checkIn, checkOut, roomType, specialRequest, status, orderDate } = modifiedBooking;
            const [result] = await connection.query('UPDATE bookings SET guest = ?, checkIn = ?, checkOut = ?, roomType = ?, specialRequest = ?, status = ?, orderDate = ? WHERE id = ?', 
                [guest, checkIn, checkOut, roomType, specialRequest, status, orderDate, id]);
            
            if ((result as mysql.ResultSetHeader).affectedRows === 0) throw new APIError('Booking not found', 404, true);
            return { id, ...modifiedBooking };
        } catch (error) {
            throw new APIError((error as Error).message, 500, false);
        }
    }
}

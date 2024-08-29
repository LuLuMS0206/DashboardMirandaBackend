
// import { RoomInterface } from './../interfaces/roomInterface';
// import { RoomModel, RoomDocument } from '../models/roomModel';
// import { APIError } from './../utils/APIError';

// export class RoomService {
//     static async fetchAll(): Promise<RoomDocument[]> {
//         try {
//             return await RoomModel.find().exec();
//         } catch (error) {
//             throw new APIError((error as Error).message, 500, false);
//         }
//     }

//     static async fetchOne(roomId: string): Promise<RoomDocument | null> {
//         try {
//             const room = await RoomModel.findOne({ _id: roomId }).exec();
//             if (!room) throw new APIError('Room not found', 404, true);
//             return room;
//         } catch (error) {
//             throw new APIError((error as Error).message, 500, false);
//         }
//     }

//     static async addRoom(newRoom: RoomInterface): Promise<RoomDocument> {
//         try {
//             const room = new RoomModel(newRoom);
//             await room.save();
//             return room;
//         } catch (error) {
//             throw new APIError((error as Error).message, 500, false);
//         }
//     }

//     static async removeRoom(roomId: string): Promise<void> {
//         try {
//             const result = await RoomModel.findByIdAndDelete(roomId).exec();
//             if (!result) throw new APIError('Room not found', 404, true);
//         } catch (error) {
//             throw new APIError((error as Error).message, 500, false);
//         }
//     }

//     static async modifyRoom(modifiedRoom: RoomInterface & { _id: string }): Promise<RoomDocument | null> {
//         try {
//             const room = await RoomModel.findByIdAndUpdate(modifiedRoom._id, modifiedRoom, { new: true }).exec();
//             if (!room) throw new APIError('Room not found', 404, true);
//             return room;
//         } catch (error) {
//             throw new APIError((error as Error).message, 500, false);
//         }
//     }

//     static async searchRooms(searchTerm: string): Promise<RoomDocument[]> {
//         try {
//             return await RoomModel.find({
//                 $or: [
//                     { roomType: { $regex: searchTerm, $options: 'i' } },
//                     { amenities: { $elemMatch: { $regex: searchTerm, $options: 'i' } } }
//                 ]
//             }).exec();
//         } catch (error) {
//             throw new APIError((error as Error).message, 500, false);
//         }
//     }
// }


import { RoomInterface } from './../interfaces/roomInterface';
import { APIError } from './../utils/APIError';
import { connection } from './../connectDB';
import mysql from 'mysql2/promise';

export class RoomService {
    // Ver todas las habitaciones
    static async fetchAll(): Promise<RoomInterface[]> {
        try {
            const [rows] = await connection.query<mysql.RowDataPacket[]>('SELECT * FROM rooms');
            return rows.map(row => ({
                _id: row.id.toString(),
                image: row.image,
                roomNumber: row.roomNumber,
                roomType: row.roomType,
                amenities: row.amenities.split(','),
                price: row.price,
                offerPrice: row.offerPrice,
                status: row.status,
                availability: row.availability
            })) as RoomInterface[];
        } catch (error) {
            throw new APIError((error as Error).message, 500, false);
        }
    }

    // Ver una habitación por ID
    static async fetchOne(roomId: number): Promise<RoomInterface | null> {
        try {
            const [rows] = await connection.query<mysql.RowDataPacket[]>('SELECT * FROM rooms WHERE id = ?', [roomId]);
            if (rows.length === 0) throw new APIError('Room not found', 404, true);
            const row = rows[0];
            return {
                _id: row.id.toString(),
                image: row.image,
                roomNumber: row.roomNumber,
                roomType: row.roomType,
                amenities: row.amenities.split(','),
                price: row.price,
                offerPrice: row.offerPrice,
                status: row.status,
                availability: row.availability
            } as RoomInterface;
        } catch (error) {
            throw new APIError((error as Error).message, 500, false);
        }
    }

    // Añadir una nueva habitación
    static async addRoom(newRoom: RoomInterface): Promise<RoomInterface> {
        try {
            const { image, roomNumber, roomType, amenities, price, offerPrice, status, availability } = newRoom;
            const [result] = await connection.query(
                'INSERT INTO rooms (image, roomNumber, roomType, amenities, price, offerPrice, status, availability) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', 
                [image, roomNumber, roomType, amenities.join(','), price, offerPrice, status, availability]
            );
            const insertId = (result as mysql.ResultSetHeader).insertId;
            return { _id: insertId.toString(), ...newRoom };
        } catch (error) {
            throw new APIError((error as Error).message, 500, false);
        }
    }

    // Eliminar una habitación por ID
    static async removeRoom(roomId: number): Promise<void> {
        try {
            const [result] = await connection.query('DELETE FROM rooms WHERE id = ?', [roomId]);
            if ((result as mysql.ResultSetHeader).affectedRows === 0) throw new APIError('Room not found', 404, true);
        } catch (error) {
            throw new APIError((error as Error).message, 500, false);
        }
    }

    // Actualizar una habitación por ID
    static async modifyRoom(modifiedRoom: RoomInterface & { _id: string }): Promise<RoomInterface | null> {
        try {
            const { _id, image, roomNumber, roomType, amenities, price, offerPrice, status, availability } = modifiedRoom;
            const [result] = await connection.query(
                'UPDATE rooms SET image = ?, roomNumber = ?, roomType = ?, amenities = ?, price = ?, offerPrice = ?, status = ?, availability = ? WHERE id = ?',
                [image, roomNumber, roomType, amenities.join(','), price, offerPrice, status, availability, _id]
            );
            if ((result as mysql.ResultSetHeader).affectedRows === 0) throw new APIError('Room not found', 404, true);
            return modifiedRoom;
        } catch (error) {
            throw new APIError((error as Error).message, 500, false);
        }
    }

    // Buscar habitaciones por término de búsqueda
    static async searchRooms(searchTerm: string): Promise<RoomInterface[]> {
        try {
            const [rows] = await connection.query<mysql.RowDataPacket[]>(
                'SELECT * FROM rooms WHERE roomType LIKE ? OR amenities LIKE ?', 
                [`%${searchTerm}%`, `%${searchTerm}%`]
            );
            return rows.map(row => ({
                _id: row.id.toString(),
                image: row.image,
                roomNumber: row.roomNumber,
                roomType: row.roomType,
                amenities: row.amenities.split(','),
                price: row.price,
                offerPrice: row.offerPrice,
                status: row.status,
                availability: row.availability
            })) as RoomInterface[];
        } catch (error) {
            throw new APIError((error as Error).message, 500, false);
        }
    }
}

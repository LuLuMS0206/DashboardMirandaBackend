

// import { User } from './../interfaces/userInterface';
// import { UserModel, UserDocument } from '../models/userModel';
// import { APIError } from './../utils/APIError';

// export class UserService {
//     static async fetchAll(): Promise<UserDocument[]> {
//         try {
//             return await UserModel.find().exec();
//         } catch (error) {
//             throw new APIError((error as Error).message, 500, false);
//         }
//     }

//     static async fetchOne(userId: string): Promise<UserDocument | null> {
//         try {
//             const user = await UserModel.findById(userId).exec();
//             if (!user) throw new APIError('User not found', 404, true);
//             return user;
//         } catch (error) {
//             throw new APIError((error as Error).message, 500, false);
//         }
//     }

//     static async fetchByEmail(email: string): Promise<UserDocument | null> {
//         try {
//             const user = await UserModel.findOne({ email }).exec();
//             return user;
//         } catch (error) {
//             throw new APIError((error as Error).message, 500, false);
//         }
//     }

//     static async addUser(newUser: User): Promise<UserDocument> {
//         try {
//             const user = new UserModel(newUser);
//             await user.save();
//             return user;
//         } catch (error) {
//             throw new APIError((error as Error).message, 500, false);
//         }
//     }

//     static async removeUser(userId: string): Promise<void> {
//         try {
//             const result = await UserModel.findByIdAndDelete(userId).exec();
//             if (!result) throw new APIError('User not found', 404, true);
//         } catch (error) {
//             throw new APIError((error as Error).message, 500, false);
//         }
//     }

//     static async modifyUser(modifiedUser: User & { _id: string }): Promise<UserDocument | null> {
//         try {
//             const user = await UserModel.findByIdAndUpdate(modifiedUser._id, modifiedUser, { new: true }).exec();
//             if (!user) throw new APIError('User not found', 404, true);
//             return user;
//         } catch (error) {
//             throw new APIError((error as Error).message, 500, false);
//         }
//     }

//     static async authenticate(email: string, password: string): Promise<UserDocument | null> {
//         try {
//             const user = await UserModel.findOne({ email }).exec();
//             if (!user) throw new APIError('User not found', 404, true);

//             const isMatch = await user.comparePassword(password);
//             if (!isMatch) throw new APIError('Invalid credentials', 401, true);

//             return user;
//         } catch (error) {
//             throw new APIError((error as Error).message, 500, false);
//         }
//     }
// }

import { User } from './../interfaces/userInterface';
import { APIError } from './../utils/APIError';
import { connection } from './../connectDB';
import mysql from 'mysql2/promise';

export class UserService {
    // Ver todos los usuarios
    static async fetchAll(): Promise<User[]> {
        try {
            const [rows] = await connection.query<mysql.RowDataPacket[]>('SELECT * FROM users');
            return rows.map(row => ({
                _id: row.id.toString(),
                name: row.name,
                email: row.email,
                startDate: row.startDate,
                description: row.description,
                contact: row.contact,
                status: row.status,
                foto: row.foto
            })) as User[];
        } catch (error) {
            throw new APIError((error as Error).message, 500, false);
        }
    }

    // Ver un usuario por ID
    static async fetchOne(userId: number): Promise<User | null> {
        try {
            const [rows] = await connection.query<mysql.RowDataPacket[]>('SELECT * FROM users WHERE id = ?', [userId]);
            if (rows.length === 0) throw new APIError('User not found', 404, true);
            const row = rows[0];
            return {
                _id: row.id.toString(),
                name: row.name,
                email: row.email,
                startDate: row.startDate,
                description: row.description,
                contact: row.contact,
                status: row.status,
                foto: row.foto
            } as User;
        } catch (error) {
            throw new APIError((error as Error).message, 500, false);
        }
    }

    // Añadir un nuevo usuario
    static async addUser(newUser: User): Promise<User> {
        try {
            const { name, email, password, startDate, description, contact, status, foto } = newUser;
            const [result] = await connection.query(
                'INSERT INTO users (name, email, password, startDate, description, contact, status, foto) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', 
                [name, email, password, startDate, description, contact, status, foto]
            );
            const insertId = (result as mysql.ResultSetHeader).insertId;
            return { _id: insertId.toString(), ...newUser };
        } catch (error) {
            throw new APIError((error as Error).message, 500, false);
        }
    }

    // Eliminar un usuario por ID
    static async removeUser(userId: number): Promise<void> {
        try {
            const [result] = await connection.query('DELETE FROM users WHERE id = ?', [userId]);
            if ((result as mysql.ResultSetHeader).affectedRows === 0) throw new APIError('User not found', 404, true);
        } catch (error) {
            throw new APIError((error as Error).message, 500, false);
        }
    }

    // Actualizar un usuario por ID
    static async modifyUser(modifiedUser: User & { _id: string }): Promise<User | null> {
        try {
            const { _id, name, email, password, startDate, description, contact, status, foto } = modifiedUser;
            const [result] = await connection.query(
                'UPDATE users SET name = ?, email = ?, password = ?, startDate = ?, description = ?, contact = ?, status = ?, foto = ? WHERE id = ?',
                [name, email, password, startDate, description, contact, status, foto, _id]
            );
            if ((result as mysql.ResultSetHeader).affectedRows === 0) throw new APIError('User not found', 404, true);
            return modifiedUser;
        } catch (error) {
            throw new APIError((error as Error).message, 500, false);
        }
    }

    // Autenticar un usuario
    static async authenticate(email: string, password: string): Promise<User | null> {
        try {
            const [rows] = await connection.query<mysql.RowDataPacket[]>(
                'SELECT * FROM users WHERE email = ? AND password = ?', 
                [email, password]
            );
            if (rows.length === 0) throw new APIError('Invalid credentials', 401, true);
            const row = rows[0];
            return {
                _id: row.id.toString(),
                name: row.name,
                email: row.email,
                startDate: row.startDate,
                description: row.description,
                contact: row.contact,
                status: row.status,
                foto: row.foto
            } as User;
        } catch (error) {
            throw new APIError((error as Error).message, 500, false);
        }
    }
}

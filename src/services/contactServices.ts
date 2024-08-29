
// import { Contact } from './../interfaces/contactInterface';
// import { APIError } from './../utils/APIError';
// import { ContactModel, ContactDocument } from '../models/contactModel';

// export class ContactService {
//     static async fetchAll(): Promise<ContactDocument[]> {
//         try {
//             return await ContactModel.find().exec();
//         } catch (error) {
//             throw new APIError((error as Error).message, 500, false);
//         }
//     }

//     static async fetchOne(contactId: number): Promise<ContactDocument | null> {
//         try {
//             const contact = await ContactModel.findOne({ id: contactId }).exec();
//             if (!contact) throw new APIError('Contact not found', 404, true);
//             return contact;
//         } catch (error) {
//             throw new APIError((error as Error).message, 500, false);
//         }
//     }

//     static async addContact(newContact: Contact): Promise<ContactDocument> {
//         try {
//             const contact = new ContactModel({
//                 ...newContact,
//                 id: newContact.id, // Mantenemos el id proporcionado
//             });
//             await contact.save();
//             return contact;
//         } catch (error) {
//             throw new APIError((error as Error).message, 500, false);
//         }
//     }

//     static async removeContact(contactId: number): Promise<void> {
//         try {
//             const result = await ContactModel.findOneAndDelete({ id: contactId }).exec();
//             if (!result) throw new APIError('Contact not found', 404, true);
//         } catch (error) {
//             throw new APIError((error as Error).message, 500, false);
//         }
//     }

//     static async modifyContact(modifiedContact: Contact): Promise<ContactDocument | null> {
//         try {
//             const contact = await ContactModel.findOneAndUpdate(
//                 { id: modifiedContact.id },
//                 modifiedContact,
//                 { new: true }
//             ).exec();
//             if (!contact) throw new APIError('Contact not found', 404, true);
//             return contact;
//         } catch (error) {
//             throw new APIError((error as Error).message, 500, false);
//         }
//     }
// }
import { Contact } from './../interfaces/contactInterface';
import { APIError } from './../utils/APIError';
import { connection } from './../connectDB';
import mysql from 'mysql2/promise';

export class ContactService {
    // Ver todos los contactos
    static async fetchAll(): Promise<Contact[]> {
        try {
            const [rows] = await connection.query<mysql.RowDataPacket[]>('SELECT * FROM contacts');
            return rows.map(row => ({
                id: row.id,
                date: row.date,
                client: {
                    name: row.client_name,
                    email: row.client_email,
                    phone: row.client_phone,
                },
                subject: row.subject,
                comment: row.comment,
                status: row.status
            })) as Contact[];
        } catch (error) {
            throw new APIError((error as Error).message, 500, false);
        }
    }

    // Ver un contacto por ID
    static async fetchOne(contactId: number): Promise<Contact | null> {
        try {
            const [rows] = await connection.query<mysql.RowDataPacket[]>('SELECT * FROM contacts WHERE id = ?', [contactId]);
            if (rows.length === 0) throw new APIError('Contact not found', 404, true);
            const row = rows[0];
            return {
                id: row.id,
                date: row.date,
                client: {
                    name: row.client_name,
                    email: row.client_email,
                    phone: row.client_phone,
                },
                subject: row.subject,
                comment: row.comment,
                status: row.status
            } as Contact;
        } catch (error) {
            throw new APIError((error as Error).message, 500, false);
        }
    }

    // Añadir un nuevo contacto
    static async addContact(newContact: Contact): Promise<Contact> {
        try {
            const { date, client, subject, comment, status } = newContact;
            const [result] = await connection.query<mysql.OkPacket>(
                'INSERT INTO contacts (date, client_name, client_email, client_phone, subject, comment, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [date, client.name, client.email, client.phone, subject, comment, status]
            );
            const newId = result.insertId;
            return { id: newId, ...newContact };
        } catch (error) {
            throw new APIError((error as Error).message, 500, false);
        }
    }

    // Eliminar un contacto por ID
    static async removeContact(contactId: number): Promise<void> {
        try {
            const [result] = await connection.query<mysql.OkPacket>('DELETE FROM contacts WHERE id = ?', [contactId]);
            if (result.affectedRows === 0) throw new APIError('Contact not found', 404, true);
        } catch (error) {
            throw new APIError((error as Error).message, 500, false);
        }
    }

    // Actualizar un contacto
    static async modifyContact(modifiedContact: Contact): Promise<Contact | null> {
        try {
            const { id, date, client, subject, comment, status } = modifiedContact;
            const [result] = await connection.query<mysql.OkPacket>(
                'UPDATE contacts SET date = ?, client_name = ?, client_email = ?, client_phone = ?, subject = ?, comment = ?, status = ? WHERE id = ?',
                [date, client.name, client.email, client.phone, subject, comment, status, id]
            );
            if (result.affectedRows === 0) throw new APIError('Contact not found', 404, true);
            return { id, ...modifiedContact };
        } catch (error) {
            throw new APIError((error as Error).message, 500, false);
        }
    }
}

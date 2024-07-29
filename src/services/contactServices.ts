
import { Contact } from './../interfaces/contactInterface';
import { APIError } from './../utils/APIError';
import { ContactModel, ContactDocument } from '../models/contactModel';

export class ContactService {
    static async fetchAll(): Promise<ContactDocument[]> {
        try {
            return await ContactModel.find().exec();
        } catch (error) {
            throw new APIError((error as Error).message, 500, false);
        }
    }

    static async fetchOne(contactId: number): Promise<ContactDocument | null> {
        try {
            const contact = await ContactModel.findOne({ id: contactId }).exec();
            if (!contact) throw new APIError('Contact not found', 404, true);
            return contact;
        } catch (error) {
            throw new APIError((error as Error).message, 500, false);
        }
    }

    static async addContact(newContact: Contact): Promise<ContactDocument> {
        try {
            const contact = new ContactModel({
                ...newContact,
                id: newContact.id, // Mantenemos el id proporcionado
            });
            await contact.save();
            return contact;
        } catch (error) {
            throw new APIError((error as Error).message, 500, false);
        }
    }

    static async removeContact(contactId: number): Promise<void> {
        try {
            const result = await ContactModel.findOneAndDelete({ id: contactId }).exec();
            if (!result) throw new APIError('Contact not found', 404, true);
        } catch (error) {
            throw new APIError((error as Error).message, 500, false);
        }
    }

    static async modifyContact(modifiedContact: Contact): Promise<ContactDocument | null> {
        try {
            const contact = await ContactModel.findOneAndUpdate(
                { id: modifiedContact.id },
                modifiedContact,
                { new: true }
            ).exec();
            if (!contact) throw new APIError('Contact not found', 404, true);
            return contact;
        } catch (error) {
            throw new APIError((error as Error).message, 500, false);
        }
    }
}

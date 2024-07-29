import mongoose, { Schema, Document } from "mongoose";
import { Contact } from "./../interfaces/contactInterface";

export interface ContactDocument extends Document {
    date: string;
    client: {
        name: string;
        email: string;
        phone: string;
    };
    subject: string;
    comment: string;
    status: 'public' | 'archived';
}

const Contact: Schema<ContactDocument> = new Schema({
    date: { type: String, required: true },
    client: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
    },
    subject: { type: String, required: true },
    comment: { type: String, required: true },
    status: { type: String, enum: ['public', 'archived'], required: true },
});

export const ContactModel = mongoose.model<ContactDocument>('Contact', Contact, 'contacts');

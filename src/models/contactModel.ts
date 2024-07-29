import mongoose, { Schema } from "mongoose";
import {Contact} from "./../interfaces/contactInterface";

const Contact = new Schema <Contact> ({
    date: { type: String, required: true },
    client: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
    },
    subject: { type: String, required: true },
    comment:{ type: String, required: true },
    status: { type: String, enum: ['public', 'archived'], required: true },

})

export const ContactModel = mongoose.model<Contact>('ContactModel', Contact, 'contacts');
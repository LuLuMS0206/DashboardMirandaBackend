
import mongoose, { Schema, Document } from 'mongoose';
import { User } from './../interfaces/userInterface';

export interface UserDocument extends Document {
    name: string;
    email: string;
    startDate: string;
    description: string;
    contact: string;
    status: 'ACTIVE' | 'INACTIVE';
    foto: string;
    password: string;
}

const User: Schema<UserDocument> = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    startDate: { type: String, required: true },
    description: { type: String, required: true },
    contact: { type: String, required: true },
    status: { type: String, enum: ['ACTIVE', 'INACTIVE'], required: true },
    foto: { type: String, required: true },
    password: { type: String, required: true },
});

export const UserModel = mongoose.model<UserDocument>('User', User, 'users');

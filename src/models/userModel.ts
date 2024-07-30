
import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';
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
    comparePassword(candidatePassword: string): Promise<boolean>;
}

const User: Schema<UserDocument> = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    startDate: { type: String, required: true },
    description: { type: String, required: true },
    contact: { type: String, required: true },
    status: { type: String, enum: ['ACTIVE', 'INACTIVE'], required: true },
    foto: { type: String, required: true },
    password: { type: String, required: true },
});

User.pre('save', async function (next) {
    const user = this as UserDocument;
    if (!user.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        next();
    } catch (error) {
        next(error as Error);
    }
});

User.methods.comparePassword = async function (candidatePassword: string) {
    return await bcrypt.compare(candidatePassword, this.password);
};

export const UserModel = mongoose.model<UserDocument>('User', User, 'users');

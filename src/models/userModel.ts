import mongoose, { Schema } from "mongoose";
import {User} from "./../interfaces/userInterface";

const User = new Schema <User> ({
    name: { type: String, required: true },
    email: { type: String, required: true },
    startDate: { type: String, required: true },
    description: { type: String, required: true },
    contact: { type: String, required: true },
    status: { type: String, enum: ['ACTIVE' , 'INACTIVE'], required: true },
    foto: { type: String, required: true },
    password: { type: String, required: true },
})

export const UserModel = mongoose.model<User>('UserModel', User, 'users');
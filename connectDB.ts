
const mongoose = require("mongoose"); 

export async function connectDB() {

    try {
        await mongoose.connect('mongodb+srv://luciamacho00:wtNqhbB03R7ZFY2w@cluster0.qavfymp.mongodb.net/mirandaMongo');
        console.log('Mongoose connected to database');
    }catch (err) {
        console.error('Mongoose connection error:', err);
    }
    
}

export async function disconnectDB() {
    try {
        await mongoose.disconnect();
        console.log('Mongoose disconnected from database');
    } catch (err) {
        console.error('Mongoose disconnection error:', err);
    }
}


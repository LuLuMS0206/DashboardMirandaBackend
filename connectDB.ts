
const mongoose = require("mongoose"); 

export async function connectDB() {

    try {
        await mongoose.connect('mongodb://localhost:27017/apiMiranda');
        console.log('Mongoose connected to database');
    }catch (err) {
        console.error('Mongoose connection error:', err);
    }
    
}

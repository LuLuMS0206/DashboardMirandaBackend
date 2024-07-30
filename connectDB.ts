import mongoose from 'mongoose';

export async function connectDB() {

    mongoose.connection.on('connected', () => {
        console.log('Mongoose connected to database');
    });

    mongoose.connection.on('error', (err) => {
        console.error('Mongoose connection error:', err);
    });
    
    await mongoose.connect(process.env.MONGO_STRING!);
}

connectDB().catch(err => console.log(err));
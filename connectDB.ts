
// const mongoose = require("mongoose"); 

// export async function connectDB() {

//     try {
//         await mongoose.connect('mongodb+srv://luciamacho00:wtNqhbB03R7ZFY2w@cluster0.qavfymp.mongodb.net/mirandaMongo');
//         console.log('Mongoose connected to database');
//     }catch (err) {
//         console.error('Mongoose connection error:', err);
//     }
    
// }

// export async function disconnectDB() {
//     try {
//         await mongoose.disconnect();
//         console.log('Mongoose disconnected from database');
//     } catch (err) {
//         console.error('Mongoose disconnection error:', err);
//     }
// }

import mysql from 'mysql2/promise';

export const connection = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

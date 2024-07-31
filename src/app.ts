import express, { NextFunction, Request, Response } from 'express';
// import path from 'path';
import bookingController from './controllers/bookingControllers';
import 'dotenv/config';
import roomsController from './controllers/roomController';
import userController from './controllers/userContoller';
import contactController from './controllers/contactController'
import loginController from './controllers/loginController'
import { authenticateTokenMiddleware } from './middleware/auth';
import mongoose from 'mongoose';
// import { connectDB } from '../connectDB';

// connectDB()

const start = async () => {
  try {
    await mongoose.connect(
      "mongodb://localhost:27017/apiMiranda"
    )
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
start();

process.env.TOKEN_SECRET;

export const app = express();
// export const port = 3000;
app.use(express.json());

app.use('/auth', loginController);
app.use(authenticateTokenMiddleware);
app.use('/bookings', bookingController);
app.use('/rooms', roomsController);
app.use('/users', userController);
app.use('/contacts', contactController);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Unexpected error occurred' });
});
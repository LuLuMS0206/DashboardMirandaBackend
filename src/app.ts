

import express, { NextFunction, Request, Response } from 'express';
import bookingController from './controllers/bookingControllers';
import 'dotenv/config';
import roomsController from './controllers/roomController';
import userController from './controllers/userContoller';
import contactController from './controllers/contactController';
import loginController from './controllers/loginController';
import { authenticateTokenMiddleware } from './middleware/auth';
import mongoose from 'mongoose';
import cors from 'cors'; 

const start = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://luciamacho00:wtNqhbB03R7ZFY2w@cluster0.qavfymp.mongodb.net/mirandaMongo"
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
start();

process.env.TOKEN_SECRET;

export const app = express();

app.use(cors()); 

app.use(express.json());

app.use('/login', (_req, res) => {
  return res.send('Lucia');
});

app.use('/auth', loginController);
app.use('/bookings', authenticateTokenMiddleware, bookingController);
app.use('/rooms', authenticateTokenMiddleware, roomsController);
app.use('/users', authenticateTokenMiddleware, userController);
app.use('/contacts', authenticateTokenMiddleware, contactController);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Unexpected error occurred' });
});



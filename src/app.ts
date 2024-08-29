import express, { NextFunction, Request, Response } from 'express';
import bookingController from './controllers/bookingControllers';
import 'dotenv/config';
import roomsController from './controllers/roomController';
import userController from './controllers/userContoller';
import contactController from './controllers/contactController';
import loginController from './controllers/loginController';
import { authenticateTokenMiddleware } from './middleware/auth';
import cors from 'cors'; 
import { connection } from 'connectDB';

export const start = async () => {
  try {
    
    await connection;

  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
start();

const corsOptions = {
  origin: '*', 
  optionsSuccessStatus: 200, 
};

export const app = express();
// app.use(cors()); 

app.use(cors(corsOptions));

app.use(express.json());
app.use('/auth', loginController);
app.use('/bookings',authenticateTokenMiddleware, bookingController);
app.use('/rooms', authenticateTokenMiddleware, roomsController);
app.use('/users', authenticateTokenMiddleware, userController);
app.use('/contacts', authenticateTokenMiddleware, contactController);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Unexpected error occurred' });
});
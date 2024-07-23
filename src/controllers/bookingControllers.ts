import express, { Request, Response, NextFunction } from 'express';
import { BookingModel } from '../services/bookingService';
import { Booking } from '../interfaces/bookingInterface';

const bookingController = express.Router();

bookingController.get('/', (_req: Request, res: Response, next: NextFunction): void => {
    try {
        const bookings = BookingModel.fetchAll();
        res.json({ bookings });
    } catch (error) {
        next(error);
    }
});

bookingController.get('/:id', (req: Request, res: Response, next: NextFunction): void => {
    try {
        const id = parseInt(req.params.id, 10);
        const booking = BookingModel.fetchOne(id);
        if (booking) {
            res.json({ booking });
        } else {
            res.status(404).json({ message: 'Booking not found' });
        }
    } catch (error) {
        next(error);
    }
});

bookingController.post('/', (req: Request, res: Response, next: NextFunction): void => {
    try {
        const newBooking = req.body as Booking;
        BookingModel.addBooking(newBooking);
        res.json({ booking: newBooking });
    } catch (error) {
        next(error);
    }
});

bookingController.delete('/:id', (req: Request, res: Response, next: NextFunction): void => {
    try {
        const id = parseInt(req.params.id, 10);
        const updatedBookings = BookingModel.removeBooking(id);
        res.json({ bookings: updatedBookings });
    } catch (error) {
        next(error);
    }
});

bookingController.put('/:id', (req: Request, res: Response, next: NextFunction): void => {
    try {
        const id = parseInt(req.params.id, 10);
        const modifiedBooking = req.body as Booking;
        const updatedBookings = BookingModel.modifyBooking({ ...modifiedBooking, id });
        res.json({ bookings: updatedBookings });
    } catch (error) {
        next(error);
    }
});

export default bookingController;

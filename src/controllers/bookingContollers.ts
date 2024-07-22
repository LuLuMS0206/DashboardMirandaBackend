import express, { Request, Response, NextFunction } from 'express';
import { BookingModel } from './../services/bookingService';
import {Booking} from './../interfaces/bookingInterface';

const bookingController = express.Router();

bookingController.get('/', (_req: Request, res: Response, next: NextFunction): Response<JSON> | void => {
    try {
        const bookings = BookingModel.getBookings();
        return res.json({ bookings });
    } catch (error) {
        next(error);
    }
});

bookingController.get('/:id', (req: Request, res: Response, next: NextFunction): Response<JSON> | void => {
    try {
        const id = parseInt(req.params.id, 10);
        const booking = BookingModel.getBooking(id);
        return res.json({ booking });
    } catch (error) {
        next(error);
    }
});

bookingController.post('/', (req: Request, res: Response, next: NextFunction): Response<JSON> | void => {
    try {
        const newBooking = req.body as Booking;
        BookingModel.addBooking(newBooking);
        return res.json({ booking: newBooking });
    } catch (error) {
        next(error);
    }
});

bookingController.delete('/:id', (req: Request, res: Response, next: NextFunction): Response<JSON> | void => {
    try {
        const id = parseInt(req.params.id, 10);
        const updatedBookings = BookingModel.removeBooking(id);
        return res.json({ bookings: updatedBookings });
    } catch (error) {
        next(error);
    }
});

bookingController.put('/:id', (req: Request, res: Response, next: NextFunction): Response<JSON> | void => {
    try {
        const id = parseInt(req.params.id, 10);
        const modifiedBooking = req.body as Booking;
        const updatedBookings = BookingModel.modifyBooking({ ...modifiedBooking, id });
        return res.json({ bookings: updatedBookings });
    } catch (error) {
        next(error);
    }
});

export default bookingController;
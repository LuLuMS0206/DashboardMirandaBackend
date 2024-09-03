import express, { Request, Response, NextFunction } from 'express';
import { BookingService } from './../services/bookingService'; 
import { Booking } from './../interfaces/bookingInterface';
import { createValidationMiddleware } from './../middleware/validation';
import { bookingSchema } from './../validators/bookingValidators';

const bookingController = express.Router();

bookingController.get('/', async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const bookings = await BookingService.fetchAll();
        res.json(bookings);
    } catch (error) {
        next(error);
    }
});

bookingController.get('/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id = parseInt(req.params.id); 
        const booking = await BookingService.fetchOne(id);
        if (booking) {
            res.json(booking);
        } else {
            res.status(404).json({ message: 'Booking not found' });
        }
    } catch (error) {
        next(error);
    }
});

bookingController.post('/', createValidationMiddleware(bookingSchema), async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const newBooking = req.body as Booking;
        const booking = await BookingService.addBooking(newBooking);
        res.status(201).json(booking);
    } catch (error) {
        next(error);
    }
});

bookingController.delete('/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id = parseInt(req.params.id);
        await BookingService.removeBooking(id);
        res.status(204).send(); 
    } catch (error) {
        next(error);
    }
});

bookingController.put('/:id', createValidationMiddleware(bookingSchema), async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id = parseInt(req.params.id); 
        const modifiedBooking = req.body as Booking;
        const booking = await BookingService.modifyBooking({ ...modifiedBooking, id });
        if (booking) {
            res.json(booking);
        } else {
            res.status(404).json({ message: 'Booking not found' });
        }
    } catch (error) {
        next(error);
    }
});

export default bookingController;

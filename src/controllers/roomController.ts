// import express, { Request, Response, NextFunction } from 'express';
// import { RoomService } from './../services/roomServices'; 
// import { RoomInterface } from './../interfaces/roomInterface';

// const roomController = express.Router();

// roomController.get('/', async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
//     try {
//         const rooms = await RoomService.fetchAll();
//         res.json({ rooms });
//     } catch (error) {
//         next(error);
//     }
// });

// roomController.get('/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     try {
//         const id = req.params.id; 
//         const room = await RoomService.fetchOne(id);
//         if (room) {
//             res.json({ room });
//         } else {
//             res.status(404).json({ message: 'Room not found' });
//         }
//     } catch (error) {
//         next(error);
//     }
// });

// roomController.post('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     try {
//         const newRoom = req.body as RoomInterface;
//         const room = await RoomService.addRoom(newRoom);
//         res.status(201).json({ room });
//     } catch (error) {
//         next(error);
//     }
// });

// roomController.delete('/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     try {
//         const id = req.params.id; 
//         await RoomService.removeRoom(id);
//         res.status(204).send();
//     } catch (error) {
//         next(error);
//     }
// });

// roomController.put('/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     try {
//         const id = req.params.id; 
//         const modifiedRoom = req.body as RoomInterface;
//         const room = await RoomService.modifyRoom({ ...modifiedRoom, id });
//         if (room) {
//             res.json({ room });
//         } else {
//             res.status(404).json({ message: 'Room not found' });
//         }
//     } catch (error) {
//         next(error);
//     }
// });

// export default roomController;


import express, { Request, Response, NextFunction } from 'express';
import { RoomService } from './../services/roomServices';
import { RoomInterface } from './../interfaces/roomInterface';
import { roomSchema } from 'validators/roomsValidators';
import { createValidationMiddleware } from 'middleware/validation';

const roomController = express.Router();

roomController.get('/', async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const rooms = await RoomService.fetchAll();
        res.json(rooms);
    } catch (error) {
        next(error);
    }
});

roomController.get('/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id = parseInt(req.params.id); 
        const room = await RoomService.fetchOne(id);
        if (room) {
            res.json(room);
        } else {
            res.status(404).json({ message: 'Room not found' });
        }
    } catch (error) {
        next(error);
    }
});

roomController.post('/',  createValidationMiddleware(roomSchema), async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const newRoom = req.body as RoomInterface;
        const room = await RoomService.addRoom(newRoom);
        res.status(201).json(room);
    } catch (error) {
        next(error);
    }
});

roomController.delete('/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id = parseInt(req.params.id); 
        await RoomService.removeRoom(id);
        res.status(204).send(); 
    } catch (error) {
        next(error);
    }
});

roomController.put('/:id',  createValidationMiddleware(roomSchema), async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id = req.params.id; 
        const modifiedRoom = req.body as RoomInterface;
        const room = await RoomService.modifyRoom({ ...modifiedRoom, _id: id });
        if (room) {
            res.json(room);
        } else {
            res.status(404).json({ message: 'Room not found' });
        }
    } catch (error) {
        next(error);
    }
});

export default roomController;

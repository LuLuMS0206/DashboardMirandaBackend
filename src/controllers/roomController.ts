
import express, { Request, Response, NextFunction } from 'express';
import { RoomModel } from './../../src/services/roomServices';
import { RoomInterface } from './../interfaces/roomInterface';

const roomController = express.Router();

roomController.get('/', (_req: Request, res: Response, next: NextFunction): void => {
  try {
    const rooms = RoomModel.fetchAll();
    res.json({ rooms });
  } catch (error) {
    next(error);
  }
});

roomController.get('/:id', (req: Request, res: Response, next: NextFunction): void => {
  try {
    const id = req.params.id;
    const room = RoomModel.fetchOne(id);
    if (room) {
      res.json({ room });
    } else {
      res.status(404).json({ message: 'Room not found' });
    }
  } catch (error) {
    next(error);
  }
});

roomController.post('/', (req: Request, res: Response, next: NextFunction): void => {
  try {
    const newRoom = req.body as RoomInterface;
    RoomModel.addRoom(newRoom);
    res.status(201).json({ room: newRoom });
  } catch (error) {
    next(error);
  }
});

roomController.delete('/:id', (req: Request, res: Response, next: NextFunction): void => {
  try {
    const id = req.params.id;
    const updatedRooms = RoomModel.removeRoom(id);
    res.json({ rooms: updatedRooms });
  } catch (error) {
    next(error);
  }
});

roomController.put('/:id', (req: Request, res: Response, next: NextFunction): void => {
  try {
    const id = req.params.id;
    const modifiedRoom = req.body as RoomInterface;
    const updatedRooms = RoomModel.modifyRoom({ ...modifiedRoom, id });
    res.json({ rooms: updatedRooms });
  } catch (error) {
    next(error);
  }
});

export default roomController;

import express, { Request, Response, NextFunction } from 'express';
import { UserService } from './../services/userServices';
import { User } from '../interfaces/userInterface';

const userController = express.Router();

userController.get('/', async (_req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const users = await UserService.fetchAll();
    return res.json(users);
  } catch (error) {
    next(error);
  }
});

userController.get('/:id', async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const id = req.params.id; // id como string
    const user = await UserService.fetchOne(id);
    if (user) {
      return res.json(user);
    } else {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    next(error);
  }
});

userController.post('/', async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const newUser = req.body as User;
    const user = await UserService.addUser(newUser);
    return res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

userController.delete('/:id', async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const id = req.params.id; // id como string
    await UserService.removeUser(id);
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
});

userController.put('/:id', async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const id = req.params.id; // id como string
    const modifiedUser = req.body as User;
    const user = await UserService.modifyUser({ ...modifiedUser, _id: id });
    if (user) {
      return res.json(user);
    } else {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    next(error);
  }
});

export default userController;

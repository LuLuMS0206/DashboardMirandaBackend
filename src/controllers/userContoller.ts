import express, { Request, Response, NextFunction } from 'express';
import { UserService } from './../services/userServices';
import { User } from '../interfaces/userInterface';

const userController = express.Router();

userController.get('/', (_req: Request, res: Response, next: NextFunction): Response | void => {
  try {
    const users = UserService.fetchAll();
    return res.json({ users });
  } catch (error) {
    next(error);
  }
});

userController.get('/:id', (req: Request, res: Response, next: NextFunction): Response | void => {
  try {
    const id = req.params.id;
    const user = UserService.fetchOne(id);
    return res.json({ user });
  } catch (error) {
    next(error);
  }
});

userController.post('/', (req: Request, res: Response, next: NextFunction): Response | void => {
  try {
    const newUser = req.body as User;
    UserService.addUser(newUser);
    return res.json({ user: newUser });
  } catch (error) {
    next(error);
  }
});

userController.delete('/:id', (req: Request, res: Response, next: NextFunction): Response | void => {
  try {
    const id = req.params.id;
    const updatedUsers = UserService.removeUser(id);
    return res.json({ users: updatedUsers });
  } catch (error) {
    next(error);
  }
});

userController.put('/:id', (req: Request, res: Response, next: NextFunction): Response | void => {
  try {
    const id = req.params.id;
    const modifiedUser = req.body as User;
    const updatedUsers = UserService.modifyUser({ ...modifiedUser, id });
    return res.json({ users: updatedUsers });
  } catch (error) {
    next(error);
  }
});

export default userController;

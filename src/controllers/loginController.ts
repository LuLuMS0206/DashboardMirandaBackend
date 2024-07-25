import express, { Request, Response, NextFunction } from 'express';
import LoginModel from './../services/loginService';

const loginController = express.Router();

loginController.post('/', (req: Request, res: Response, next: NextFunction): void => {
    try {
        const token: string = LoginModel.authenticateUser(req.body.userName, req.body.password);
        res.json({ token });
    } catch (error: any) {
        res.status(401).json({ error: error.message });
    }
});

export default loginController;

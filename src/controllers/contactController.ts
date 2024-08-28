import express, { Request, Response, NextFunction } from 'express';
import { ContactService } from './../services/contactServices';
import { Contact } from '../interfaces/contactInterface';

const contactController = express.Router();

contactController.get('/', (_req: Request, res: Response, next: NextFunction): Response | void => {
  try {
    const contacts = ContactService.fetchAll();
    return res.json(contacts);
  } catch (error) {
    next(error);
  }
});

contactController.get('/:id', (req: Request, res: Response, next: NextFunction): Response | void => {
  try {
    const id = parseInt(req.params.id);
    const contact = ContactService.fetchOne(id);
    return res.json(contact);
  } catch (error) {
    next(error);
  }
});

contactController.post('/', (req: Request, res: Response, next: NextFunction): Response | void => {
  try {
    const newContact = req.body as Contact;
    ContactService.addContact(newContact);
    return res.json(newContact);
  } catch (error) {
    next(error);
  }
});

contactController.delete('/:id', (req: Request, res: Response, next: NextFunction): Response | void => {
  try {
    const id = parseInt(req.params.id);
    const updatedContacts = ContactService.removeContact(id);
    return res.json(updatedContacts);
  } catch (error) {
    next(error);
  }
});

contactController.put('/:id', (req: Request, res: Response, next: NextFunction): Response | void => {
  try {
    const id = parseInt(req.params.id);
    const modifiedContact = req.body as Contact;
    const updatedContacts = ContactService.modifyContact({ ...modifiedContact, id });
    return res.json(updatedContacts);
  } catch (error) {
    next(error);
  }
});

export default contactController;

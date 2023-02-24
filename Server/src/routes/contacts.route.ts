import { Router } from 'express';
import ContactsController from '@controllers/contacts.controller';
import { CreateContactDto } from '@dtos/contacts.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import authIdMiddleware from '@/middlewares/authid.middleware copy';

class ContactsRoute implements Routes {
  public path = '/contacts';
  public router = Router();
  public contactsController = new ContactsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.contactsController.getContacts);
    this.router.get(`${this.path}/:id(\\d+)`, this.contactsController.getContactById);
    this.router.get(`${this.path}/user/:user_id(\\d+)`, authIdMiddleware, this.contactsController.getContactByUser);
    this.router.post(`${this.path}`, authIdMiddleware, validationMiddleware(CreateContactDto, 'body'), this.contactsController.createContact);
    this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(CreateContactDto, 'body', true), this.contactsController.updateContact);
    this.router.delete(`${this.path}/:id(\\d+)`, this.contactsController.deleteContact);
  }
}

export default ContactsRoute;

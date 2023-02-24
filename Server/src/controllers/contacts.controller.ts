import { NextFunction, Request, Response } from 'express';
import { CreateContactDto } from '@dtos/contacts.dto';
import { Contact } from '@interfaces/contacts.interface';
import contactService from '@services/contacts.service';

class ContactsController {
  public contactService = new contactService();

  public getContacts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllContactsData: Contact[] = await this.contactService.findAllContact();

      res.status(200).json({ data: findAllContactsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getContactById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const contactId = Number(req.params.id);
      const findOneContactData: Contact = await this.contactService.findContactById(contactId);

      res.status(200).json({ data: findOneContactData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public getContactByUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.params.user_id);
      const findContactByUserData: Contact[] = await this.contactService.findContactByUser(userId);

      res.status(200).json({ data: findContactByUserData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public createContact = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const contactData: CreateContactDto = req.body;
      const createContactData: Contact = await this.contactService.createContact(contactData);

      res.status(201).json({ data: createContactData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateContact = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const contactId = Number(req.params.id);
      const contactData: CreateContactDto = req.body;
      const updateContactData: Contact = await this.contactService.updateContact(contactId, contactData);

      res.status(200).json({ data: updateContactData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteContact = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const contactId = Number(req.params.id);
      const deleteContactData: Contact = await this.contactService.deleteContact(contactId);

      res.status(200).json({ data: deleteContactData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default ContactsController;

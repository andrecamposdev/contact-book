import { EntityRepository, Repository } from 'typeorm';
import { CreateContactDto } from '@dtos/contacts.dto';
import { ContactEntity } from '@entities/contacts.entity';
import { HttpException } from '@exceptions/HttpException';
import { Contact } from '@interfaces/contacts.interface';
import { isEmpty } from '@utils/util';

@EntityRepository()
class ContactService extends Repository<ContactEntity> {
  public async findAllContact(): Promise<Contact[]> {
    const contacts: Contact[] = await ContactEntity.find();
    return contacts;
  }

  public async findContactById(contactId: number): Promise<Contact> {
    if (isEmpty(contactId)) throw new HttpException(400, 'ContactId is empty');

    const findContact: Contact = await ContactEntity.findOne({ where: { id: contactId } });
    if (!findContact) throw new HttpException(409, "Contact doesn't exist");

    return findContact;
  }

  public async findContactByUser(userId: number): Promise<Contact[]> {
    if (isEmpty(userId)) throw new HttpException(400, 'Contact is empty');

    const findContactByUser: Contact[] = await ContactEntity.find({ where: { user_id: userId } });
    if (!findContactByUser) throw new HttpException(409, "Contact doesn't exist");

    return findContactByUser;
  }

  public async createContact(contactData: CreateContactDto): Promise<Contact> {
    if (isEmpty(contactData)) throw new HttpException(400, 'contactData is empty');

    const createContactData: Contact = await ContactEntity.create({ ...contactData }).save();

    return createContactData;
  }

  public async updateContact(contactId: number, contactData: CreateContactDto): Promise<Contact> {
    if (isEmpty(contactData)) throw new HttpException(400, 'contactData is empty');

    const findContact: Contact = await ContactEntity.findOne({ where: { id: contactId } });
    if (!findContact) throw new HttpException(409, "Contact doesn't exist");

    await ContactEntity.update(contactId, { ...contactData });

    const updateContact: Contact = await ContactEntity.findOne({ where: { id: contactId } });
    return updateContact;
  }

  public async deleteContact(contactId: number): Promise<Contact> {
    if (isEmpty(contactId)) throw new HttpException(400, 'ContactId is empty');

    const findContact: Contact = await ContactEntity.findOne({ where: { id: contactId } });
    if (!findContact) throw new HttpException(409, "Contact doesn't exist");

    await ContactEntity.delete({ id: contactId });
    return findContact;
  }
}

export default ContactService;

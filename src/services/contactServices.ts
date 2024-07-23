import { Contact } from '../interfaces/contactInterface';
import contactDataList from './../data/contacts';
import { APIError } from '../utils/APIError';

export class ContactService {
  static fetchAll(): Contact[] {
    return contactDataList as Contact[];
  }

  static fetchOne(contactId: number): Contact {
    const contact = contactDataList.find((contact: Contact) => contact.id === contactId);
    if (!contact) {
      throw new APIError('Contact not found', 404, true);
    }
    return contact;
  }

  static addContact(newContact: Contact): void {
    contactDataList.push(newContact);
  }

  static removeContact(contactId: number): Contact[] {
    const index = contactDataList.findIndex((contact: Contact) => contact.id === contactId);
    if (index === -1) {
      throw new APIError('Contact not found', 404, true);
    }
    contactDataList.splice(index, 1);
    return contactDataList;
  }

  static modifyContact(modifiedContact: Contact): Contact[] {
    const index = contactDataList.findIndex((contact: Contact) => contact.id === modifiedContact.id);
    if (index === -1) {
      throw new APIError('Contact not found', 404, true);
    }
    contactDataList[index] = modifiedContact;
    return contactDataList;
  }
}

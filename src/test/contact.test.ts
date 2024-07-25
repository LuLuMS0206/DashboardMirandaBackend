import request from 'supertest';
import jwt from 'jsonwebtoken';
import { app } from '../app'; 
import { ContactService } from './../services/contactServices';
import { Contact } from '../interfaces/contactInterface';
import { contactDataList } from '../data/contacts';

describe('Contacts API', () => {
  let token: string;

  beforeAll(() => {
    token = jwt.sign({ username: 'admin' }, process.env.TOKEN_SECRET!, { expiresIn: '1h' });
  });

  it('should return 401 for requests without token', async () => {
    const res = await request(app).get('/contacts');
    expect(res.status).toBe(401);
  });

  it('should return an array of contact instances', async () => {
    const res = await request(app)
      .get('/contacts')
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ contacts: ContactService.fetchAll() });
  });

  it('should return a single contact instance', async () => {
    const contactId = contactDataList[0].id;
    const res = await request(app)
      .get(`/contacts/${contactId}`)
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ contact: ContactService.fetchOne(contactId) });
  });

  it('should add a new contact', async () => {
    const newContact: Contact = {
      id: 10,
      date: '2024-07-24',
      client: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '123-456-7890'
      },
      subject: 'Inquiry',
      comment: 'Looking for availability.',
      status: 'public',
    };

    (ContactService.addContact as jest.Mock).mockImplementation((contact: Contact) => {
      contactDataList.push(contact);
    });

    const res = await request(app)
      .post('/contacts')
      .send(newContact)
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ contact: newContact });
  });

  it('should delete a contact', async () => {
    const contactId = contactDataList[0].id;
    const res = await request(app)
      .delete('/contacts')
      .send({ id: contactId })
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ contacts: ContactService.removeContact(contactId) });
  });

  it('should update a contact', async () => {
    const contactId = contactDataList[0].id;
    const updatedContact = {
      ...contactDataList[0],
      subject: 'Updated Subject',
    };

    const res = await request(app)
      .put(`/contacts/${contactId}`)
      .send(updatedContact)
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ contacts: ContactService.modifyContact(updatedContact) });
  });
});

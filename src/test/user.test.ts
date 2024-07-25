import request from 'supertest';
import jwt from 'jsonwebtoken';
import { app } from '../app';
import { User } from '../interfaces/userInterface';
import { UserService } from './../services/userServices'; 
import { userDataList } from './../data/users';

describe('Users API', () => {
  let token: string;

  beforeAll(() => {
    token = jwt.sign({ username: 'admin' }, process.env.TOKEN_SECRET!, { expiresIn: '1h' });
  });

  it('should return 401 for requests without token', async () => {
    const res = await request(app).get('/users');
    expect(res.status).toBe(401);
  });

  it('should return an array of user instances', async () => {
    const res = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ users: UserService.fetchAll() });
  });

  it('should return a single user instance', async () => {
    const userId = userDataList[0].id;
    const res = await request(app)
      .get(`/users/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ user: UserService.fetchOne(userId) });
  });

  it('should add a new user', async () => {
    const newUser: User = {
      id: 'user123',
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      startDate: '2024-07-24',
      description: 'New user in the system',
      contact: '123-456-7890',
      status: 'ACTIVE',
      foto: 'https://example.com/jane.jpg',
    };

    (UserService.addUser as jest.Mock).mockImplementation((user: User) => {
      userDataList.push(user);
    });

    const res = await request(app)
      .post('/users')
      .send(newUser)
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ user: newUser });
  });

  it('should delete a user', async () => {
    const userId = userDataList[0].id;
    const res = await request(app)
      .delete('/users')
      .send({ id: userId })
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ users: UserService.removeUser(userId) });
  });

  it('should update a user', async () => {
    const userId = userDataList[0].id;
    const updatedUser = {
      ...userDataList[0],
      name: 'Updated Name',
    };

    const res = await request(app)
      .put(`/users/${userId}`)
      .send(updatedUser)
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ users: UserService.modifyUser(updatedUser) });
  });
});

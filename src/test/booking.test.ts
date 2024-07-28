import request from 'supertest';
import { app } from '../app';
import jwt from 'jsonwebtoken';
import {bookingDataList} from './../data/bookings';

if (!process.env.TOKEN_SECRET) {
  throw new Error('TOKEN_SECRET is not defined in environment variables');
}

const token = jwt.sign({ userName: 'Lucia' }, process.env.TOKEN_SECRET, { expiresIn: '1h' });

describe('Bookings API', () => {
  it('should return 401 for requests without token', async () => {
    const res = await request(app).get('/bookings');
    expect(res.statusCode).toEqual(401);
  });

  it('should return list of bookings for authenticated requests', async () => {
    const res = await request(app)
      .get('/bookings')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body).toEqual(bookingDataList); 
  });
});

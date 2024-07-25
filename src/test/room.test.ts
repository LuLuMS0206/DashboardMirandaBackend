import request from 'supertest';
import jwt from 'jsonwebtoken';
import { app } from '../app';
import { RoomModel } from '../services/roomServices';
import { RoomInterface } from '../interfaces/roomInterface';
import { roomDataList } from '../data/rooms';

jest.mock('../services/roomServices');

describe('Rooms API', () => {
  let token: string;

  beforeAll(() => {
    token = jwt.sign({ username: 'admin' }, process.env.TOKEN_SECRET!, { expiresIn: '1h' });
  });

  it('should return 401 for requests without token', async () => {
    const res = await request(app).get('/rooms');
    expect(res.status).toBe(401);
  });

  it('should return an array of room instances', async () => {
   
    (RoomModel.fetchAll as jest.Mock).mockReturnValue(roomDataList);

    const res = await request(app)
      .get('/rooms')
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');
    
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ rooms: roomDataList });
  });

  it('should return a single room instance', async () => {
    const roomId = roomDataList[0].id;
    (RoomModel.fetchOne as jest.Mock).mockReturnValue(new RoomModel(roomDataList.find(room => room.id === roomId) as RoomInterface));

    const res = await request(app)
      .get(`/rooms/${roomId}`)
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');
    
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ room: roomDataList.find(room => room.id === roomId) });
  });

  it('should add a new room', async () => {
    const newRoom: RoomInterface = {
      id: 'ROOM109',
      image: 'https://example.com/new-room.jpg',
      roomNumber: '109',
      roomType: 'Deluxe',
      amenities: ['WiFi', 'Air Conditioning', 'TV', 'Mini Bar'],
      price: 160,
      offerPrice: 140,
      status: 'Available',
      availability: 'available',
    };

    (RoomModel.addRoom as jest.Mock).mockImplementation((room: RoomInterface) => {
      roomDataList.push(room);
    });

    const res = await request(app)
      .post('/rooms')
      .send(newRoom)
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ room: newRoom });
  });

  it('should delete a room', async () => {
    const roomId = roomDataList[0].id;
    (RoomModel.removeRoom as jest.Mock).mockReturnValue(roomDataList.filter(room => room.id !== roomId));

    const res = await request(app)
      .delete('/rooms')
      .send({ id: roomId })
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ rooms: roomDataList.filter(room => room.id !== roomId) });
  });

  it('should update a room', async () => {
    const roomId = roomDataList[0].id;
    const updatedRoom: RoomInterface = {
      ...roomDataList[0],
      roomType: 'Updated Room Type',
    };

    (RoomModel.modifyRoom as jest.Mock).mockReturnValue(roomDataList.map(room =>
      room.id === roomId ? updatedRoom : room
    ));

    const res = await request(app)
      .put(`/rooms/${roomId}`)
      .send(updatedRoom)
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ room: updatedRoom });
  });
});

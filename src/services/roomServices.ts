import { RoomInterface } from './../../src/interfaces/roomInterface';
import {roomDataList} from './../../src/data/rooms';
import { APIError } from './../utils/APIError';
import fs from 'fs';
import path from 'path';

export class RoomModel implements RoomInterface {
  id: string;
  image: string;
  roomNumber: string;
  roomType: string;
  amenities: string[];
  price: number;
  offerPrice: number;
  status: string;
  availability: string;

  constructor(room: RoomInterface) {
    this.id = room.id;
    this.image = room.image;
    this.roomNumber = room.roomNumber;
    this.roomType = room.roomType;
    this.amenities = room.amenities;
    this.price = room.price;
    this.offerPrice = room.offerPrice;
    this.status = room.status;
    this.availability = room.availability;
  }

  static fetchOne(roomId: string): RoomModel | void {
    const roomList = roomDataList as RoomModel[];
    if (!roomList) throw new APIError("There is no rooms data", 500, false);

    const room = roomList.find((room: RoomModel) => room.id === roomId);
    if (!room) throw new APIError("Room not found", 400, true);

    return new RoomModel(room);
  }

  static fetchAll(): RoomModel[] {
    const roomList = roomDataList as RoomModel[];
    if (!roomList) throw new APIError("There is no rooms data", 500, false);

    return roomList.map(room => new RoomModel(room));
  }

  static searchRooms(searchTerm: string): RoomModel[] {
    const roomList = roomDataList as RoomModel[];
    if (!roomList) throw new APIError("There is no rooms data", 500, false);

    const filteredRoomList = roomList.filter((room: RoomModel) =>
      room.roomType.includes(searchTerm) ||
      room.amenities.some(amenity => amenity.includes(searchTerm))
    );

    return filteredRoomList.map(room => new RoomModel(room));
  }

  static addRoom(newRoom: RoomInterface): void {
    const roomList = roomDataList as RoomModel[];
    const room = new RoomModel(newRoom);
    roomList.push(room);
    saveRooms(roomList);
  }

  static removeRoom(roomId: string): RoomModel[] {
    let roomList = roomDataList as RoomModel[];
    roomList = roomList.filter((room: RoomModel) => room.id !== roomId);
    saveRooms(roomList);
    return roomList.map(room => new RoomModel(room));
  }

  static modifyRoom(modifiedRoom: RoomInterface): RoomModel[] {
    let roomList = roomDataList as RoomModel[];
    roomList = roomList.map(room => room.id === modifiedRoom.id ? new RoomModel(modifiedRoom) : room);
    saveRooms(roomList);
    return roomList.map(room => new RoomModel(room));
  }
}

function saveRooms(rooms: RoomModel[]): void {
  const dataPath = path.join(__dirname, '../data/rooms.json');
  try {
    fs.writeFileSync(dataPath, JSON.stringify(rooms, null, 2));
  } catch (err) {
    console.error('Error saving rooms:', err);
  }
}

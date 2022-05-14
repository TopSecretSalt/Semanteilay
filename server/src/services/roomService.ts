import { mapParticipants } from "../socket/socket";
import * as repository from "../repositories/roomRepository";

export const createRoom = async (name: string) => await repository.createRoom(name);

export const getAllRooms = async () => {
  const rooms = await repository.getAllRooms();
  return mapParticipants(rooms);
};

export const getRoomById = async (id: string) => {
  const room = await repository.getRoomById(id);
  return mapParticipants([room])[0];
};

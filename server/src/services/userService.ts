import { hookSocketWithUser } from "../socket/socket";
import * as repository from "../repositories/userRepository";
import { getRoomById } from "./roomService";
import { leaveTeam } from "./teamService";

export const signUp = async (name: string, socketId: string) => {
  if (await repository.isNameTaken(name)) {
    throw new Error("nickname taken")    
  }

  const { entityId: id} = await repository.createUser(name);
  await hookSocketWithUser(id, socketId);

  return id;
};

export const getAllUsers = async () => await repository.getAllUsers();

export const getUserById = async (id: string) => await repository.getUserById(id);

export const leaveRoom = async (userId: string, roomId: string) => {
  const room = await getRoomById(roomId);
  room.teams.forEach(async team => {
    await leaveTeam(userId, team, roomId)
  })
}


export const deleteUser = async (userId: string) => await repository.deleteUser(userId);
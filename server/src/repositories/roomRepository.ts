import { Entity, Schema } from "redis-om";
import client from "../db/redis";
import { fetchTeams } from "./teamRepository";

interface Room {
  name: string;
  teams: string[];
}

class Room extends Entity {
  formatted() {
    return {
      id: this.entityId,
      name: this.name,
      teams: this.teams ?? [],
    };
  }

  static async populated(room: Room) {
    const {id, name, teams} = room.formatted();
    return {
      id, 
      name,
      teams: await fetchTeams(teams),
    };
  }
}

const schema = new Schema(Room, {
  name: { type: "string" },
  teams: { type: "string[]" },
});

export const roomRepository = client.fetchRepository(schema);

export const getAllRooms = async () => (await roomRepository.search().return.all()).map(room => room.formatted())

export const populate = async (rooms: Room[]) => await Promise.all(rooms.map(Room.populated))

export const createRoom = async (name: string) => (await roomRepository.createAndSave({ name })).formatted()

export const getRoomById = async (id: string) => (await roomRepository.fetch(id)).formatted();

export const initialize = async () => {
  await roomRepository.createIndex();
  console.log("room index built");
};

initialize()

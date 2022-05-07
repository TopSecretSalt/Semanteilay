import { Entity, Schema } from "redis-om";
import client from "../redis";
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

export const getAllRooms = async () => {
  const rooms = await roomRepository.search().return.all();
  return await Promise.all(rooms.map(Room.populated));
};

export const initialize = async () => {
  await roomRepository.createIndex();
  console.log("room index built");
};

initialize()

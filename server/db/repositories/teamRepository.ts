import { Entity, Schema } from "redis-om";
import client from "../redis";
import { fetchUsers } from "./userRepository";

interface Team {
  name: string;
  members: string[];
}

class Team extends Entity {
  formatted() {
    return {
      id: this.entityId,
      name: this.name,
      members: this.members ?? [],
    };
  }

  static async populated(team: Team) {
    const {id, name, members} = team.formatted();
    return {
      id, 
      name,
      members: await fetchUsers(members),
    };
  }
}

const schema = new Schema(Team, {
  members: { type: "string[]" },
  name: { type: "string" },
});

export const teamRepository = client.fetchRepository(schema);

export const fetchTeams = async (teamsIds: string[]) => {
  const teams = await Promise.all(teamsIds.map(teamId => teamRepository.fetch(teamId)));
  return await Promise.all(teams.map(Team.populated));
};

export const initialize = async () => {
  await teamRepository.createIndex();
  console.log("team index built");
};

initialize();
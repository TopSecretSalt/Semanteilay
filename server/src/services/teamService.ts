import * as repository from "../repositories/teamRepository";
import { addTeamToRoom, removeTeamFromRoom } from "./roomService";

export const getTeamById = async (id: string) => await repository.getTeamById(id);

interface CreateTeamParams {
  name: string;
  userId: string;
  roomId: string;
}

export const createTeam = async ({ name, userId, roomId }: CreateTeamParams) => {
  const team = await repository.createTeam(name, userId);
  await addTeamToRoom(roomId, team.id);

  return team;
};

export const leaveTeam = async (userId: string, teamId: string, roomId: string) => {
  const team = await repository.leaveTeam(userId, teamId);

  if (team.isEmpty()) {
    await removeTeamFromRoom(roomId, teamId);
    await repository.deleteTeam(teamId);
  }
};

export const joinTeam = async (userId: string, teamId: string) => {
  await repository.joinTeam(userId, teamId);
};

export const changeTeam = async (userId: string, teamId: string, roomdId: string) => {
  const oldTeam = await repository.getTeamByUser(userId);
  console.log("changing teams");
  if (oldTeam && oldTeam.entityId !== teamId) { // TODO: maybe fix band-aid looking code
    console.log("leaving old team");
    await leaveTeam(userId, oldTeam.entityId, roomdId);
  }

  await joinTeam(userId, teamId); // TODO: fix having two replica members in team
};

export const getAllTeams = async () => await repository.getAllTeams();
import * as repository from "../repositories/teamRepository";

export const getTeamById = async (id: string) =>  await repository.getTeamById(id);

export const createTeam = async ({name, members}: {name: string, members: string[]}) => await repository.createTeam(name, members);
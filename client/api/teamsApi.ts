import { User } from "../models";
import { postApi, SERVER_URL } from "./api";

const BASE_URL = '/teams';

const post = postApi(BASE_URL);

export const createTeam = async (name: string, members: User[]) => await post({name, members});

export const GET_TEAM_BY_ID_URL = `${SERVER_URL + BASE_URL}/`

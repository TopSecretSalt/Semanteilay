import { post } from "./api";

const BASE_URL = 'users';

export const signIn = async (name: string) => await post({name}, BASE_URL);

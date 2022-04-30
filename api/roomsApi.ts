import { User } from "../models";
import { post} from "./api";

const BASE_URL = 'rooms';

export const createRoomBy = async (roomName: string, user: User) => await post({ roomName, user }, BASE_URL);

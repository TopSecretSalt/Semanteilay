import { Socket } from "socket.io-client";
import { User } from "../models";
import { post} from "./api";

const BASE_URL = 'rooms';

export const createRoomBy = async (roomName: string, user: User, socket: Socket) => {
    const room = await post({ roomName }, BASE_URL);
    socket.emit("createRoom", {roomdId: room.entityId, userName: user.name})

    return room;
}

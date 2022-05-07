
import { getAllRooms as getRooms } from "../repositories/roomRepository";

export const getAllRooms = async () => {
    const rooms = await getRooms();
    // add to response the participant amount of each room. will not be store in DB
    // with each room join/leave/socket-disconnect an update will be sent to lobby of roomId-participant amount
}

const getParticipants = ({ id }: {id : string}) => {

}
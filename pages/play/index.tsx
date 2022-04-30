import type { NextPage } from "next";
import { useContext, useEffect, FormEventHandler } from "react";
import styles from "./play.module.css";
import { SocketContext } from "../../context/socket";
import Title from "../../components/title";
import { Room, User } from "../../models";
import { useRooms } from "../../hooks/useRooms";
import Rooms from "../../components/rooms";
import CreateRoom from "../../components/createRoom";
import { useReadLocalStorage } from "usehooks-ts";
import { createRoomBy } from "../../api/roomsApi";

export const getServerSideProps = ({ res }: any) => {
  return {
    props: {
      allRooms: res.rooms ?? [],
    },
  };
};

interface PlayProps {
  allRooms: Room[];
}
const Play: NextPage<PlayProps> = ({ allRooms }) => {
  const socket = useContext(SocketContext);
  const user = useReadLocalStorage<User>("user");
  const [rooms, addRoom] = useRooms(allRooms);

  useEffect(() => {
    socket.on("room created", (payload: Room) => {
      console.log("recieved event");
      addRoom(payload);
    });

    return () => {
      socket.removeAllListeners();
    };
  }, [addRoom, socket]);

  const createNewRoom = async (roomName: string) => {
    try {
      const { roomId, teamId } = await createRoomBy(roomName, user as User);
      console.log(`created room with id ${roomId} and team with id ${teamId}`);
    } catch (error) {
      console.error("failed to create new room");
    }
  };

  return (
    <main>
      <Title />
      <CreateRoom handleCreate={createNewRoom} />
      <Rooms rooms={rooms} />
    </main>
  );
};

export default Play;

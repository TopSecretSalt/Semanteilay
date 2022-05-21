import type { NextPage } from "next";
import { useContext, useEffect } from "react";
import styles from "./lobby.module.css";
import { SocketContext } from "../../context/socket";
import Title from "../../components/title";
import Rooms from "../../components/rooms";
import CreateRoom from "../../components/createRoom";
import { createRoom } from "../../api/roomsApi";
import { useRouter } from "next/router";

const Lobby: NextPage = () => {
  const socket = useContext(SocketContext);
  const router = useRouter();

  useEffect(() => {
    socket.emit("joinLobby");
  }, [socket]);

  const createNewRoom = async (roomName: string) => { // TODO: move this to useRoom
    try {
      const { id, name } = await createRoom(roomName);
      router.prefetch("/room");
      router.push({ pathname: "/room", query: { id } }, `/room/${name.replaceAll(" ", "-")}`); // TODO: add "as" but have ability to refresh
      console.log(`created room with id ${id}`);
    } catch (error) {
      console.error("failed to create new room");
    }
  };

  return (
    <main>
      <Title>Lobby</Title>
      <CreateRoom handleCreate={createNewRoom} />
      <Rooms />
    </main>
  );
};

export default Lobby;

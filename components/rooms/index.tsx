import { FC } from "react";
import styles from "./rooms.module.css";
import { Room } from "../../models";

interface RoomsProps {
  rooms: Room[];
}

const Rooms: FC<RoomsProps> = ({ rooms }) => {
  return (
    <div className={styles.grid}>
      {rooms.map(({ roomId }) => {
        return (
          <a key={roomId} className={styles.card}>
            <h2>{roomId}</h2>
          </a>
        );
      })}
    </div>
  );
};

export default Rooms;

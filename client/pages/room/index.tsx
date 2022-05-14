import { useRouter } from "next/router";
import { FC, useCallback, useContext, useEffect } from "react";
import { useRoom } from "../../hooks/useRoom";
import { SocketContext } from "../../context/socket";
import Skeleton from "react-loading-skeleton";
import { useReadLocalStorage } from "usehooks-ts";
import { User } from "../../models";
import TeamName from "../../components/teamName";
import useUser from "../../hooks/useUser";
import useTeam from "../../hooks/useTeam";

const Room: FC = () => {
  const socket = useContext(SocketContext);
  const router = useRouter();
  const { room, isLoading, isError } = useRoom((router.query.id as string) ?? "-");
  const { user } = useUser()
  const {name, switchTeam, changeTeamName} = useTeam();
  
  if (isLoading || isError)
    return (
      <h1>
        <Skeleton />
      </h1>
    );
  // add proper handling

  return (
    <>
    <TeamName initialName={name} onChange={changeTeamName}/>
      <h1>
        <span key={room.participantCount} className="flip-animate">
          {room.name} With <span data-hover={room.participantCount}>{room.participantCount}</span>{" "}
          Players
        </span>
      </h1>
      <hr />
      {room.teams.map((team) => {
        return <h4 key={team.id}>{team.name}</h4>;
      })}
    </>
  );
};

export default Room;

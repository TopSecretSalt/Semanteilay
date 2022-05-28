import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import { useRoom } from "../../hooks/useRoom";
import Skeleton from "react-loading-skeleton";
import TeamName from "../../components/teamName";
import useTeam from "../../hooks/useTeam";
import Guesses from "../../components/guesses";

const Room: FC = () => {
  const router = useRouter();
  const { room, isLoading, isError, updateRoom } = useRoom((router.query.id as string) ?? "-");
  const {name, switchTeam, changeTeamName} = useTeam(room, updateRoom);

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
        return <h4 key={team.id} onClick={() => switchTeam(team.id)}>{team.name}</h4>;
      })}
      <Guesses />
    </>
  );
};

export default Room;

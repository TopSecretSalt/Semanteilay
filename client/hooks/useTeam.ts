import { useCallback, useState } from "react";
import useSWR from "swr";
import { fetcher } from "../api/api";
import { createTeam as createNewTeam, GET_TEAM_BY_ID_URL as url } from "../api/teamsApi";
import { Room } from "../models";
import useUser from "./useUser";

const useTeam = (room: Room) => {
  const { user, changeTeam } = useUser();
  const [name, setName] = useState(user.teamId ? "" : `${user.name}'s team`);
  const { data, error } = useSWR(user.teamId ? [url, user.teamId] : null, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  }); //TODO does null return error?

  (async () => {
    if (!user.teamId && room) {
      const id = await createNewTeam({ name, user, room });
      console.log(`get that team: ${id}`);
      changeTeam(id as string, room.id);
    }
  })();

  const switchTeam = useCallback((teamId: string) => {
    changeTeam(teamId, room?.id);
  }, [changeTeam, room]);

  const changeName = useCallback((newName: string) => null, []);

  return { name, switchTeam, changeTeamName: changeName };
};

export default useTeam;

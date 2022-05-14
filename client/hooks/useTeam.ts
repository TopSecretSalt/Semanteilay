import { useCallback, useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "../api/api";
import { createTeam as createNewTeam, GET_TEAM_BY_ID_URL as url } from "../api/teamsApi";
import useUser from "./useUser";

const useTeam = () => {
  const { user, changeTeam } = useUser();
  const [name, setName] = useState(user.teamId ? "" : `${user.name}'s team`);
  const { data, error } = useSWR(user.teamId ? [url, user.teamId] : null, fetcher); //TODO: does it know to run again when teamId changes? // does null return error?

  const createTeam = useCallback(async () => {
    const { id } = await createNewTeam(name, [user]);
    changeTeam(id);
  }, [user, name, changeTeam]);

  useEffect(() => {
    console.log('useTeam rendered');
  }, []);

  useEffect(() => {
    if (!user.teamId) {
      console.log(user);
      createTeam(); // gets called 3 times instead of just 1
    }
  }, [createTeam, user]);

  const switchTeam = useCallback(() => null, [])
  const changeName = useCallback((newName: string) => null, []);

  return { name, switchTeam, changeTeamName: changeName };
};

export default useTeam;

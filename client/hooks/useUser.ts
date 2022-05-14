import { useRouter } from "next/router";
import { useCallback, useContext, useEffect } from "react";
import { SocketContext } from "../context/socket";
import { User } from "../models";
import useSessionStorage from "./userSessionStorage";
import { signUp as saveUser } from "../api/userApi";

const emptyUser: User = { name: "", id: "", socketId: "" };

const useUser = () => {
  const [user, setUser] = useSessionStorage("user", emptyUser);
  const socket = useContext(SocketContext);
  const router = useRouter();

  const signOut = useCallback(() => setUser(emptyUser), [setUser]);

  const signIn = (user: User) => {
    setUser(user);
  };

  const signUp = async ({ name }: Omit<User, "socketId" | "id">) => {
    const { id } = await saveUser(name);
    signIn({ id, name, socketId: socket.id });
  };

  const changeTeam = (teamId: string) => {
    setUser({...user, teamId});
  }

  useEffect(() => {
    socket.on("disconnect", signOut);
    return () => {
      socket.removeListener("disconnect", signOut); // TODO: reconsider ux when refresh kicks you out
    };
  }, [socket, user, signOut]);

  useEffect(() => {
    if (user.name === "" && router.pathname !== "/") {
      router.push("/");
    }
  }, [router, user]);

  return { user, signUp, signOut, changeTeam };
};

export default useUser;

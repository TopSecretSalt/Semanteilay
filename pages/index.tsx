import { Button, TextField } from "@mui/material";
import { FC, FormEventHandler, useEffect } from "react";
import styles from "./login.module.css";
import { useRouter } from "next/router";
import { useInput } from "../hooks/useInput";
import { useLocalStorage } from "usehooks-ts";
import Title from "../components/title";
import { User } from "../models";
import { signIn } from "../api/userApi";

const Login: FC = () => {
  const [storedUser, setStoredUser] = useLocalStorage<User>("user", { name: "" });
  const { value: name, setValue: setName, bind } = useInput("");
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/lobby");
  }, [router]);

  useEffect(() => {
    setName(storedUser.name);
  }, [storedUser.name, setName]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    try {
      const id = await signIn(name);
      setStoredUser({ name });
      router.push("/lobby");
    } catch (error) {
      console.error("couldn't sign in");
    }
  };

  return (
    <main>
      <Title>This shit</Title>
      <form onSubmit={handleSubmit}>
        <TextField {...bind} label="nickname" sx={{ margin: 1 }} />
        <Button type="submit" sx={{ width: "15ch" }}>
          <b>Play</b>
        </Button>
      </form>
    </main>
  );
};

export default Login;

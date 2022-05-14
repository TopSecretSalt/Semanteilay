import { Button, TextField } from "@mui/material";
import { FC, FormEventHandler, useEffect } from "react";
import styles from "./login.module.css";
import { useRouter } from "next/router";
import { useInput } from "../../hooks/useInput";
import { useLocalStorage } from "usehooks-ts";
import Title from "../title";
import useUser from "../../hooks/useUser"

const Login: FC = () => {
  const [lastNickname, setLastNickname] = useLocalStorage("last-nickname", "");
  const { value: name, setValue: setName, bind: bindInput } = useInput("");
  const router = useRouter();
  const { signUp } = useUser();

  useEffect(() => {
    router.prefetch("/lobby");
  }, [router]);

  useEffect(() => {
    setName(lastNickname);
  }, [lastNickname, setName]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    try {
      await signUp({name}); // TODO: add unique usernames?
      setLastNickname(name);
      router.push("/lobby");
    } catch (error) {
      console.error("couldn't sign in");
    }
  };

  return (
    <main>
      <Title>This shit</Title>
      <form onSubmit={handleSubmit}>
        <TextField {...bindInput} label="nickname" sx={{ margin: 1 }} />
        <Button type="submit" sx={{ width: "15ch" }}>
          <b>Play</b>
        </Button>
      </form>
    </main>
  );
};

export default Login;

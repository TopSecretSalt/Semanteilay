import { Button, TextField } from "@mui/material";
import { FC, FormEventHandler, useEffect } from "react";
import { useReadLocalStorage } from "usehooks-ts";
import { useInput } from "../../hooks/useInput";
import { User } from "../../models";

interface Props {
  handleCreate: (roomName: string) => void;
}

const CreateRoom: FC<Props> = ({ handleCreate }) => {
  const user = useReadLocalStorage<User>("user");
  const { value: roomToAdd, setValue: setRoomToCreate, bind } = useInput("");

  useEffect(() => {
    setRoomToCreate(`${user?.name}'s room`);
  }, [setRoomToCreate, user?.name]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    handleCreate(roomToAdd);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField variant="standard" {...bind} label="room name" sx={{ margin: 1 }} />
      <Button type="submit" sx={{ width: "20ch" }}>
        <b>Create Room</b>
      </Button>
    </form>
  );
};

export default CreateRoom;

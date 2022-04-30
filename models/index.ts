export type User = {
  id: string;
  name: string;
};

export type Room = { roomId: string; participants: User[] };

export type State = Room[];

export type Action = {
  type: string;
  payload: Room;
};

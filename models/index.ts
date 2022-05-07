export type User = {
  name: string;
};

export type Room = { roomId: string; name: string, teams: User[] | []};

export type State = Room[];

export type Action = {
  type: string;
  payload: Room;
};

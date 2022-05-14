export type User = {
  id: string;
  name: string;
  socketId: string;
  teamId?: string,
};

export type Team = {
  name: string,
  members: User,
}

export type Room = { id: string; name: string, teams: User[], participantCount?: number};
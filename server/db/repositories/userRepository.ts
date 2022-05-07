import { Entity, Schema } from "redis-om";
import client from "../redis";

interface User {
  name: string;
}

class User extends Entity {
  static formatted(team: User) {
    return {
      name: team.name,
      id: team.entityId,
    };
  }
}

const schema = new Schema(User, {
  name: { type: "string" },
});

export const userRepository = client.fetchRepository(schema);

export const fetchUsers = async (userIds: string[]) => {
  const users = await Promise.all(userIds.map((userId) => userRepository.fetch(userId)));
  return users.map(User.formatted);
};

export const initialize = async () => {
  await userRepository.createIndex();
  console.log("user index built");
};

initialize();

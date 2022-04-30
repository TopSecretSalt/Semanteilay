import { Entity, Schema } from 'redis-om'
import client from "../redis";

type ID = string;

interface Team {
    members: ID[],
}

class Team extends Entity {}

const schema = new Schema(
    Team, {
        members: { type: 'string[]'},
    },
)

export const teamRepository = client.fetchRepository(schema);

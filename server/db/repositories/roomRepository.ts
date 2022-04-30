import { Entity, Schema } from 'redis-om'
import client from "../redis";

type ID = string;

interface Room {
    name: string,
    teams: ID[],
}

class Room extends Entity {}

const schema = new Schema(
    Room, {
        name: { type: 'string' },
        teams: { type: 'string[]'}
    },
)

export const roomRepository = client.fetchRepository(schema);

import { Entity, Schema } from 'redis-om'
import client from "../redis";

interface Guess {
    word: string,
    score: number,
    rank: number,
    owner: string,
    team: string
}

class Guess extends Entity {}

const schema = new Schema(
    Guess, {
        word: { type: 'string' },
        score: { type: 'number'},
        socket: { type: 'string'},
        owner: {type: 'string'},
        team: {type: 'string'}
    },
)

export const guessRepository = client.fetchRepository(schema);

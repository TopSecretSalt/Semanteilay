import { Entity, Schema } from 'redis-om'
import client from "../db/redis";

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

export const initialize = async () => {
    await guessRepository.createIndex();
    console.log("guess index built");
};
  
initialize();
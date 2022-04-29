import { Client, Entity, Schema } from 'redis-om';

const client = new Client();

async function connect() {
    if (!client.isOpen()) {
        console.log("connected to db");
        await client.open(process.env.REDIS_URL);
    }
}

connect().then(() => console.log("db connected"));

export default client;
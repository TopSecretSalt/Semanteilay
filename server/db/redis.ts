import { Client, Entity, Schema } from 'redis-om';

const client = new Client();

async function connect() {
    if (!client.isOpen()) {
        console.log("connected to db");
        await client.open('redis://172.17.0.2:13101');
    }
}

connect().then(() => console.log("db connected"));

export default client;
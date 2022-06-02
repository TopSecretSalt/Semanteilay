console.log(process.env.REDIS_URL)

import { Client } from "redis-om";
console.log(process.env.REDIS_URL)


const client = new Client();

async function connect() {
  if (!client.isOpen()) {
    console.log(process.env.REDIS_URL)
    await client.open(process.env.REDIS_URL);
  }
}

connect().then(async () => {
  console.log("db connected");
});

export default client;

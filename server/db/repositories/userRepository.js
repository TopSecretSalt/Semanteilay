import { Entity, Schema } from 'redis-om';
import client from "../redis";
class User extends Entity {
}
const schema = new Schema(User, {
    name: { type: 'string' }
});
export const userRepository = client.fetchRepository(schema);

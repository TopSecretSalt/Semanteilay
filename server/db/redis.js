var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Client } from 'redis-om';
const client = new Client();
function connect() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!client.isOpen()) {
            console.log("connected to db");
            yield client.open('redis://172.17.0.2:13101');
        }
    });
}
connect().then(() => console.log("db connected"));
export default client;

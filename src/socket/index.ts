import io from "socket.io-client";
import { BASE_URL } from "./evn";

const myIo: any = io;
const socket = myIo(BASE_URL);
//const socket = io();
export default socket;

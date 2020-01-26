import io from 'socket.io-client';
import ENVIRONMENT_VARIABLES from "./environment.config";
let socket = null;

export function connection() {
    socket = io(ENVIRONMENT_VARIABLES.SOCKET_URL);
}

export function newSODMessage(socketKey,cb) {
    socket.on(socketKey, data => cb(null, data));
}

export function disconnect() {
    socket && socket.disconnect();
}
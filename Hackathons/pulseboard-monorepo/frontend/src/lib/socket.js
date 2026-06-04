import { io } from "socket.io-client";

// Do not provide a URL here; let it use the current window origin
const socket = io({
  withCredentials: true,
  transports: ["polling", "websocket"], // Allow polling to establish the handshake
  reconnectionAttempts: 5,
});

export default socket;
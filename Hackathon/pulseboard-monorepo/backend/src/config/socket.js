import { Server } from "socket.io";

import pollSocket from "../socket/pollSocket.js";

import analyticsSocket from "../socket/analyticsSocket.js";

let io;

export const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173", // Must match exactly what's in the browser URL
      credentials: true,
    },
    // Help Docker stay connected through the virtual network
    pingTimeout: 60000,
    pingInterval: 25000,
    connectTimeout: 45000,
    transports: ["websocket", "polling"], 
  });

  io.on("connection", (socket) => {
    console.log(
      `Socket Connected: ${socket.id}`
    );

    // Poll Events
    pollSocket(io, socket);

    // Analytics Events
    analyticsSocket(io, socket);

    socket.on("disconnect", () => {
      console.log(
        `Socket Disconnected: ${socket.id}`
      );
    });
  });
};

export const getIO = () => io;
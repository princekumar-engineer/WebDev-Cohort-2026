// 1. Load env vars first!
import "./config/env.js"; 
import http from "http";
import app from "./app.js";
import connectDB from "./config/db.js";
import { initializeSocket } from "./config/socket.js";

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

initializeSocket(server);
connectDB();

server.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
});
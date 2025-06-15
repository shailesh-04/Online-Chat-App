// soket.js
import http from "http";
import { Server } from "socket.io";
import app from "#config/app.js";
import ChatHandler from "../socketHandlers/chatHandler.js";
export const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        credentials: true,
        methods: ["GET", "POST"],
    },
});
let online = {};
io.on("connection", (socket) => {
    new ChatHandler(io, socket, online);
});

export default io;

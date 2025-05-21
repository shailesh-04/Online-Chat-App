// soket.js
import http from "http";
import { Server } from "socket.io";
import app from "#config/app.js";
import ChatHandler from "../socketHandlers/chatHandler.js";
export const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});
let onlineUID = {};
io.on("connection", (socket) => {
    new ChatHandler(io,socket,onlineUID);
});

export default io;

import { verify } from "#services/jwt.js";
class ChatHandler {
    constructor(io, socket, onlineUsers) {
        this.io = io;
        this.socket = socket;
        this.onlineUsers = onlineUsers;
        this.auth();
        this.chat();
    }
    async auth() {
        try {
            this.socket.on("user_connected", async ({ token }) => {
                const user = await verify(token);
                this.onlineUsers[user.id] = {
                    socketId: this.socket.id,
                    name: user.email,
                };
                console.log(`User Logged In: ${user.email} (${user.id})`);
                this.io.emit("online_user", Object.keys(this.onlineUsers));
            });
            this.socket.on("disconnect", () => {
                const disconnectedUserId = Object.keys(this.onlineUsers).find(
                    (id) => this.onlineUsers[id].socketId === this.socket.id
                );
                if (disconnectedUserId) {
                    delete this.onlineUsers[disconnectedUserId];
                    console.log("User disconnected:", disconnectedUserId);
                    this.io.emit("online_user", Object.keys(this.onlineUsers));
                }
            });
        } catch (error) {
            this.io.emit("socket-error", { message: error.message });
            console.log(error.message);
        }
    }
    async chat() {
        try {
            this.socket.on(
                "user_chat_message",
                async ({ to, message, token }) => {
                    try {
                        const user = await verify(token);
                        if (
                            this.onlineUsers[user.id] &&
                            this.onlineUsers[to].socketId
                        ) {
                            this.io
                                .to(this.onlineUsers[to].socketId)
                                .emit("user_chat_message", {
                                    sender: this.onlineUsers[user.id],
                                    message,
                                });
                        }
                    } catch (error) {
                         this.io.emit("socket-error", { message: error.message });
                        console.error(error.message);
                    }
                }
            );
        } catch (error) {
            this.io.emit("sekot-error", { message: error.message });
            console.log(error.message);
        }
    }
}
export default ChatHandler;

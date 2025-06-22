import Chat from "#models/chat.js";
import { verify } from "#services/jwt.js";
class ChatHandler {
    constructor(io, socket, onlineUsers) {
        this.io = io;
        this.socket = socket;
        this.onlineUsers = onlineUsers;
        this.auth();
        this.chat();
        this.changeConvesatoin();
    }
    async auth() {
        try {
            this.socket.on("user_connected", async ({ token }) => {
                const user = await verify(token);
                this.onlineUsers[user.id] = {
                    socketId: this.socket.id,
                    name: user.email,
                    activeConvesation: "",
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
                async ({ to, message, token, conversation_id }) => {
                    try {
                        const user = await verify(token);
                        if (this.onlineUsers[user.id]) {
                            const result = await Chat.createMessage(
                                conversation_id,
                                user.id,
                                message
                            );

                            this.io
                                .to(this.onlineUsers[user.id].socketId)
                                .emit("user_chat_message", {
                                    sender: user.id,
                                    message,
                                    id: result,
                                });
                            if (
                                this.onlineUsers[to].activeConvesation ==
                                user.id
                            ) {
                                this.onlineUsers[to]?.socketId
                                    ? this.io
                                          .to(this.onlineUsers[to].socketId)
                                          .emit("user_chat_message", {
                                              sender: user.id,
                                              message,
                                              id: result,
                                          })
                                    : "";
                            } else {
                                this.onlineUsers[to]?.socketId
                                    ? this.io
                                          .to(this.onlineUsers[to].socketId)
                                          .emit("user_chat_count", {
                                              sender: user.id,
                                              message,
                                              data: result,
                                          })
                                    : "";
                            }
                        }
                    } catch (error) {
                        this.io.emit("socket-error", {
                            message: error.message,
                        });
                        console.error(error.message);
                    }
                }
            );
        } catch (error) {
            this.io.emit("sekot-error", { message: error.message });
            console.log(error.message);
        }
    }
    async changeConvesatoin() {
        try {
            this.socket.on(
                "change-conversation",
                async ({ token, id, conversation_id }) => {
                    if (token && id && conversation_id) {
                        const user = await verify(token);
                        await Chat.readMessage(conversation_id, user);
                        this.onlineUsers[user.id] = {
                            ...this.onlineUsers[user.id],
                            activeConvesation: id,
                        };
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

class ChatHandler {
    #in = 45;
    constructor(io, socket,onlineUsers) {
        this.io = io;
        this.socket = socket;
        this.onlineUsers = onlineUsers;
        this.auth();
        this.chat();
    }
    async auth() {
        this.socket.on("Login", ({ uid, userName }) => {
            this.onlineUsers[uid] = {
                socketId: this.socket.id,
                userName,
            };
            console.log(`User Logged In: ${userName} (${uid})`);
            this.io.emit("user", Object.keys(this.onlineUsers));
        });
        this.socket.on("disconnect", () => {
            const disconnectedUserId = Object.keys(this.onlineUsers).find(
                (id) => this.onlineUsers[id].socketId === this.socket.id
            );
            if (disconnectedUserId) {
                delete this.onlineUsers[disconnectedUserId];
                console.log("User disconnected:", disconnectedUserId);
                this.io.emit("user", Object.keys(this.onlineUsers));
            }
        });
    }
    async chat() {
        this.socket.on("chat message", ({ to, message, data }) => {
            if (this.onlineUsers[to]) {
                this.io.to(this.onlineUsers[to].socketId).emit("chat message", {
                    data: this.onlineUsers[data.id].userName,
                    sender: false,
                    message,
                });

                this.io
                    .to(this.onlineUsers[data.id].socketId)
                    .emit("chat message", {
                        data: data.userName,
                        sender: true,
                        message,
                    });
            }
        });
    }
}
export default ChatHandler;
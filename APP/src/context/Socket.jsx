import React, {
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import { io } from "socket.io-client";
import { useAuth } from "./Auth";
import toast from "react-hot-toast";
import {getGreeting} from "@utils/greeting"
const SocketContext = createContext();
export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [onlineUserIds, setOnlineUserIds] = useState([]);
    const { token, user } = useAuth();
    const didRun = useRef(false);
    useEffect(() => {
        if (!user) return;
        const connectSocket = async () => {
            try {
                const newSocket = io("http://localhost:3000", {
                    withCredentials: true,
                });
                newSocket.on("connect", () => {
                    setIsConnected(true);
                    toast.success(`Hey ${getGreeting()} ${user?.name}, great to see you! 😄`);
                    newSocket.emit("user_connected", { token });
                });
                newSocket.on("disconnect", () => {
                    setIsConnected(false);
                    toast.error("Disconnected from chat server");
                });
                newSocket.on("connect_error", (err) => {
                    toast.error(`Connection error: ${err.message}`);
                });
                newSocket.on("socket-error", (err) => {
                    toast.error(`Connection error : ${err.message}`);
                });
                newSocket.connect();
                setSocket(newSocket);
                return () => {
                    newSocket.off("connect");
                    newSocket.off("disconnect");
                    newSocket.off("connect_error");
                    newSocket.disconnect();
                };
            } catch (err) {
                toast.error(`Socket connection failed: ${err.message}`);
            }
        };
        if (!didRun.current) connectSocket();
        didRun.current = true;
    }, [user]);

    useEffect(() => {
        if (!socket) return;
        const handleOnlineUsers = (ids) => {
            setOnlineUserIds(ids);
        };
        socket.on("online_user", handleOnlineUsers);
        return () => {
            socket.off("online_user", handleOnlineUsers);
        };
    }, [socket]);

    const value = {
        socket,
        isConnected,
        onlineUserIds,
    };
    return (
        <SocketContext.Provider value={value}>
            {children}
        </SocketContext.Provider>
    );
};
export const useSocket = () => {
    const context = useContext(SocketContext);
    if (context === undefined) {
        throw new Error("useSocket must be used within a SocketProvider");
    }
    return context;
};

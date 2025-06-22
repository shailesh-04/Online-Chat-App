import React, { useState, useRef, useEffect } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { formatChatDate, formatChatDateTime } from "@utils/formatChatDate";
import { getMessage } from "@services/chat";
import { useAuth } from "@context/Auth";
import toast from "react-hot-toast";
export default function Chat({ activeContact, messageInputRef, socket }) {
    const { user, token } = useAuth();
    const [messageInput, setMessageInput] = useState("");
    const [messages, setMessages] = useState([]);
    const chatMessagesRef = useRef(null);

    const sendMessage = () => {
        if (messageInput.trim() && activeContact) {
            socket.emit("user_chat_message", {
                to: activeContact.contact_id,
                message: messageInput,
                token: token,
                conversation_id: activeContact.conversation_id,
            });
            setMessageInput("");
        }
    };
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            sendMessage();
        }
    };
    useEffect(() => {
        if (!activeContact) return;
        const getMessageData = async (id) => {
            try {
                const data = await getMessage(id);
                setMessages(data);
            } catch (error) {
                toast.error("Content Fetching Error: " + error.message);
            }
        };
        getMessageData(activeContact.conversation_id);
    }, [activeContact]);

    useEffect(() => {
        if (!socket) return;
        const handleIncomingMessage = ({ sender, message, id }) => {
            const replyMessage = {
                id: id,
                content: message,
                conversation_id: activeContact.conversation_id,
                created_at: new Date(),
                is_read: 0,
                sender_avatar:
                    sender?.avatar ||
                    "https://randomuser.me/api/portraits/women/71.jpg",
                sender_id: sender,
            };
            setMessages((prev) => [...prev, replyMessage]);
        };
        socket.on("user_chat_message", handleIncomingMessage);
        return () => {
            socket.off("user_chat_message", handleIncomingMessage);
        };
    }, [socket, activeContact]);

    useEffect(() => {
        if (chatMessagesRef.current) {
            chatMessagesRef.current.scrollTop =
                chatMessagesRef.current.scrollHeight;
        }
    }, [messages]);
    return (
        <>
            <div className="chat-header">
                <img
                    src={activeContact.contact_avatar}
                    alt="Profile"
                    className="profile-pic"
                />
                <div className="chat-header-info">
                    <h3>{activeContact.contact_name}</h3>
                    <p>
                        last seen{" "}
                        {formatChatDate(activeContact.last_message_time)}
                    </p>
                </div>
                {activeContact.contact_status != "offline" ? (
                    ""
                ) : (
                    <div className="chat-status"></div>
                )}
            </div>
            <div className="chat-messages" ref={chatMessagesRef}>
                {messages.map((message, i) => (
                    <div
                        key={i}
                        className={`message ${
                            message.sender_id == user.id ? "sent" : "received"
                        }`}
                    >
                        <div className="message-content">{message.content}</div>
                        <div className="message-time">
                            {formatChatDateTime(message.created_at)}
                        </div>
                    </div>
                ))}
            </div>

            <div className="chat-input">
                <input
                    type="text"
                    placeholder="Type a message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    ref={messageInputRef}
                />
                <button className="send-btn" onClick={sendMessage}>
                    <FaPaperPlane />
                </button>
            </div>
        </>
    );
}

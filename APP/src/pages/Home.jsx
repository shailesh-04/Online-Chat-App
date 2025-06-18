import React, { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes, FaSearch, FaCommentDots } from "react-icons/fa";
import { useAuth } from "@context/Auth";
import { getConversations } from "@services/chat";
import toast from "react-hot-toast";
import Contant from "@components/sections/Contact";
import Chat from "@components/sections/Chat";
import { MdExitToApp } from "react-icons/md";
import { useSocket } from "../context/Socket";
const ChatApp = () => {
    const { user, logout } = useAuth();
    const { socket, isConnected, onlineUserIds } = useSocket();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeContact, setActiveContact] = useState(null);
    const [contacts, setContacts] = useState([]);
    const messageInputRef = useRef(null);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const handleFabClick = () => messageInputRef.current?.focus();
    const selectContact = (contact) => {
        setActiveContact(contact);
        if (window.innerWidth < 768) setIsMenuOpen(false);
    };
    const getConversationsData = async () => {
        try {
            const data = await getConversations();
            setContacts(data.contacts);
        } catch (error) {
            console.error("Contact fetching error:", error);
        } finally {
        }
    };
    useEffect(() => {
        if (activeContact && onlineUserIds.includes(activeContact.contact_id)) {
            setActiveContact((prev) => ({
                ...prev,
                contact_status: "online",
            }));
            toast.success(`${activeContact.name} is now online`);
        }
    }, [onlineUserIds, activeContact]);
    const didRun = useRef(false);
    useEffect(() => {
        didRun.current?getConversationsData():'';
        didRun.current = true;
    }, []);
    return (
        <div className="chat-app">
            <button className="menu-toggle" onClick={toggleMenu}>
                {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>

            <div className="chat-container">
                <div className={`sidebar ${isMenuOpen ? "active" : ""}`}>
                    <div className="flex justify-between">
                        <div className="sidebar-header">
                            <img
                                src={user.avatar}
                                alt="Profile"
                                className="profile-pic"
                            />
                            <div className="user-info">
                                <h3>{user.name}</h3>
                                <p
                                    className={
                                        isConnected
                                            ? "text-green-500"
                                            : "text-red-500"
                                    }
                                >
                                    {isConnected ? "online" : "offline"}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => {
                                logout();
                                toast.success("Logged out successfully");
                            }}
                        >
                            <MdExitToApp size={20} color="#fff" />
                        </button>
                    </div>

                    <div className="search-bar">
                        <i>
                            <FaSearch />
                        </i>
                        <input type="text" placeholder="Search contacts..." />
                    </div>

                    <Contant
                        contacts={contacts}
                        selectContact={selectContact}
                        activeContact={activeContact}
                        onlineUserIds={onlineUserIds}
                    />
                </div>

                <div className="chat-area">
                    {activeContact ? (
                        <Chat
                            activeContact={activeContact}
                            messageInputRef={messageInputRef}
                            socket={socket}
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <h1 className="text-[23px] font-bold capitalize">
                                Select a contact to start chatting
                            </h1>
                        </div>
                    )}
                </div>
            </div>
            <div className="fab" onClick={handleFabClick}>
                <FaCommentDots />
            </div>
        </div>
    );
};

export default ChatApp;

import { formatChatDate } from "@utils/formatChatDate";
import { useSocket } from "@context/Socket";
export default function Contact({
    contacts,
    selectContact,
    activeContact,
    onlineUserIds,
}) {
    const { socket } = useSocket();
    useEffect(() => {
        if (!socket) return;

        return () => {
            socket.off("user_chat_message", handleIncomingMessage);
        };
    }, [socket]);

    if (!contacts) return null;
    return (
        <div className="contacts">
            {contacts.map((contact, i) => (
                <div
                    key={contact?.conversation_id}
                    className={`contact relative ${
                        activeContact?.conversation_id ===
                        contact?.conversation_id
                            ? "active"
                            : ""
                    }`}
                    onClick={() => selectContact(contact)}
                >
                    <img
                        src={
                            contact?.contact_avatar ||
                            "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"
                        }
                        alt="Contact"
                        className="contact-pic"
                    />
                    <div className="contact-info">
                        <h4>{contact.contact_name}</h4>
                        <p>{contact.last_message}</p>
                    </div>
                    <span className="contact-time">
                        {formatChatDate(contact.last_message_time)}
                    </span>

                    {contact.unread_count ? (
                        <span className="contact-unread">
                            {contact.unread_count.toString()}
                        </span>
                    ) : (
                        ""
                    )}

                    {onlineUserIds?.includes(contact.contact_id.toString()) ? (
                        <div className="w-2 h-2 bg-green-400 rounded-full shadow-2xl absolute top-2 left-2"></div>
                    ) : null}
                </div>
            ))}
        </div>
    );
}

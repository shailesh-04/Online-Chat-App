import { formatChatDate } from "@utils/formatChatDate";
import { useEffect } from "react";
export default function Contact({ contacts, selectContact, activeContact ,onlineUserIds}) {
    return (
        <div className="contacts">
            {contacts.map((contact, i) => (
                <div
                    key={contact.conversation_id}
                    className={`contact relative ${
                        activeContact?.conversation_id ===
                        contact.conversation_id
                            ? "active"
                            : ""
                    }`}
                    onClick={() => selectContact(contact)}
                >
                    <img
                        src={contact.contact_avatar}
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
                    {contact.unread > 0 && (
                        <span className="contact-unread">{contact.unread}</span>
                    )}
                    {onlineUserIds?.includes(contact.contact_id.toString()) ? (
                        <div className="w-2 h-2 bg-green-400 rounded-full shadow-2xl absolute top-2 left-2"></div>
                    ) : null}
                </div>
            ))}
        </div>
    );
}

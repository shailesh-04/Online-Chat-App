import Chat from "#models/chat.js";
class ChatController {
    static getConversations = async (req, res) => {
        try {
            const userId = req.user.id;
            const conversations = await Chat.getConversations(userId);
            res.json({ contacts: conversations });
        } catch (error) {
            res.status(500).json({
                message: "Error fetching conversations",
                error,
            });
        }
    };
    static getMessages = async (req, res) => {
        try {
            const userId = req.user;
            const { conversationId } = req.params;
            const messages = await Chat.getMessages(conversationId,userId);
            res.json(messages);
        } catch (error) {
            res.status(500).json({ message: "Error fetching messages", error });
        }
    };
    static sendMessage = async (req, res) => {
        try {
            const { conversationId, content } = req.body;
            const senderId = req.user.userId;

            const messageId = await Chat.createMessage(
                conversationId,
                senderId,
                content
            );
            res.status(201).json({ messageId, content, senderId });
        } catch (error) {
            res.status(500).json({ message: "Error sending message", error });
        }
    };
    static startConversation = async (req, res) => {
        try {
            const userId = req.user.userId;
            const { contactId } = req.body;
            let conversation = await Chat.findConversation(userId, contactId);
            if (!conversation) {
                const conversationId = await Chat.createConversation(
                    userId,
                    contactId
                );
                conversation = {
                    id: conversationId,
                    user1_id: userId,
                    user2_id: contactId,
                };
            }
            res.status(201).json(conversation);
        } catch (error) {
            res.status(500).json({
                message: "Error starting conversation",
                error,
            });
        }
    };
    static getContacts = async (req, res) => {
        try {
            const userId = req.user.userId;
            const contacts = await Chat.getContacts(userId);
            res.json(contacts);
        } catch (error) {
            res.status(500).json({ message: "Error fetching contacts", error });
        }
    };
    static addContact = async (req, res) => {
        try {
            const userId = req.user.userId;
            const { contactId } = req.body;
            const contact = await Chat.addContact(userId, contactId);
            res.status(201).json(contact);
        } catch (error) {
            res.status(500).json({ message: "Error adding contact", error });
        }
    };
}

export default ChatController;
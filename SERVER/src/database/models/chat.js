import db from "#config/database.js";
class Chat {
    static async createConversation(user1_id, user2_id) {
        const result = await db.query(
            "INSERT INTO conversations (user1_id, user2_id) VALUES (?, ?)",
            [user1_id, user2_id]
        );
        return result.insertId;
    }

    static async findConversation(user1_id, user2_id) {
        const rows = await db.query(
            "SELECT * FROM conversations WHERE (user1_id = ? AND user2_id = ?) OR (user1_id = ? AND user2_id = ?)",
            [user1_id, user2_id, user2_id, user1_id]
        );
        return rows[0];
    }

    static async createMessage(conversation_id, sender_id, content) {
        const result = await db.query(
            "INSERT INTO messages (conversation_id, sender_id, content) VALUES (?, ?, ?)",
            [conversation_id, sender_id, content]
        );
        return result.insertId;
    }
    static async readMessage(conversation_id,user) {
        const result = await db.query(
            "update messages set is_read = true  where conversation_id = ? and sender_id != ?",
            [conversation_id, user.id]
        );
        return result;
    }
    static async getMessages(conversation_id, user) {
        await db.query(
            "update messages set is_read = true  where conversation_id = ? and sender_id != ?",
            [conversation_id, user.id]
        );
        const rows = await db.query(
            "SELECT m.*, u.name as sender_name, u.avatar as sender_avatar FROM messages m JOIN users u ON m.sender_id = u.id WHERE m.conversation_id = ? ORDER BY m.created_at",
            [conversation_id]
        );
        return rows;
    }

    static async getConversations(user_id) {
        const rows = await db.query(
            `SELECT 
            c.id AS conversation_id, 
            CASE 
                WHEN c.user1_id = ? THEN c.user2_id 
                ELSE c.user1_id 
            END AS contact_id,
            u.name AS contact_name, 
            u.avatar AS contact_avatar, 
            u.status AS contact_status,
            m.content AS last_message, 
            m.created_at AS last_message_time,
            COALESCE(um.unread_count, 0) AS unread_count
        FROM conversations c
        JOIN users u 
            ON (c.user1_id = u.id OR c.user2_id = u.id) AND u.id != ?
        LEFT JOIN (
            SELECT 
                conversation_id, 
                content, 
                created_at
            FROM messages
            WHERE id IN (
                SELECT MAX(id) 
                FROM messages 
                GROUP BY conversation_id
            )
        ) m ON m.conversation_id = c.id
        LEFT JOIN (
            SELECT 
                conversation_id, 
                COUNT(*) AS unread_count
            FROM messages
            WHERE is_read = FALSE AND sender_id != ?
            GROUP BY conversation_id
        ) um ON um.conversation_id = c.id
        WHERE c.user1_id = ? OR c.user2_id = ?
        ORDER BY m.created_at DESC;`,
            [user_id, user_id, user_id, user_id, user_id] // Now 5 parameters
        );
        return rows;
    }

    static async addContact(user_id, contact_id) {
        const result = await db.query(
            "INSERT INTO contacts (user_id, contact_id) VALUES (?, ?)",
            [user_id, contact_id]
        );
        return result.insertId;
    }

    static async getContacts(user_id) {
        const rows = await db.query(
            `SELECT u.id, u.name, u.avatar, u.status, u.last_seen
             FROM contacts c
             JOIN users u ON c.contact_id = u.id
             WHERE c.user_id = ?`,
            [user_id]
        );
        return rows;
    }
}

export default Chat;

import db from "#config/database.js";
class Users{
    static async create({ name, email, password, avatar }) {
        const result = await db.query(
            'INSERT INTO users (name, email, password, avatar) VALUES (?, ?, ?, ?)',
            [name, email, password, avatar]
        );
        return result;
    }

    static async findByEmail(email) {
        const rows = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    }

    static async findById(id) {
        const rows = await db.query('SELECT id, name, email, avatar, status, last_seen FROM users WHERE id = ?', [id]);
        return rows[0];
    }

    static async userOnline(id) {
        await db.query(
            "UPDATE users SET status = 'online', last_seen = CURRENT_TIMESTAMP WHERE id = ?",
            [id]
        );
    }
    static async userOffline(id) {
        await db.query(
            "UPDATE users SET status = 'offline', last_seen = CURRENT_TIMESTAMP WHERE id = ?",
            [id]
        );
    }
}
export default Users;
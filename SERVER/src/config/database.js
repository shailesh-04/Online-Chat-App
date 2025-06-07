import { config } from "dotenv";
import mysql from "mysql2/promise";
class Database {
    constructor() {
        config();
        this.pool = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT,
        });
    }
    async testConnecion() {
        try {
            this.conn = await this.pool.getConnection();
            await this.conn.ping();
            this.conn.release();
            console.log("successfuly connect database..");
        } catch (error) {
            console.log("found error to connect database..");
            console.error(error.message);
            process.exit(0);
        }
    }
    async query(sql, params) {
        const connection = await this.pool.getConnection();
        try {
            const [result] = await connection.query(sql, params);
            return result;
        } finally {
            connection.release();
        }
    }
}

export default new Database();

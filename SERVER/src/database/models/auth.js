import database from "#config/database.js";
class Auth {
     async login({ email, password }){
        const result = await database.query(
            "SELECT * FROM users WHERE email = ?",
            [email, password]
        );
        return result;
    };
}
export default new Auth();

import database from "#config/database.js";
class Users{
    async get(){
       const rows = await  database.query("SELECT * FROM users");
       return rows
    }
}
export default new Users();
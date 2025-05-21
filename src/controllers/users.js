import users from "#models/users.js";
class UsersController {
    async get(req, res) {
        try {
            const result = await users.get();
            res.status(200).json(result);
        } catch (error) {
           return res.status(500).send({
                message: "faild to fetching users, find server error",
                detail: error.message,
            });
        }
    }
}

export default new UsersController();

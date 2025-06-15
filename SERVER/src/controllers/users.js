import User from "#models/users.js";
import { signChat } from "#services/jwt.js";
export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res
                .status(404)
                .json({
                    message:
                        "❌ Give UserID Of User Is Not Exist On Server!, Give Another UserID",
                        code:"INPUT_INVALID_USERID"
                });
        }
        const token = signChat(user);
        return res.json({ user, token });
    } catch (error) {
        if (error.name === "CastError") {
            return res.status(400).json({
                message: "🙅‍♂️ Given Is Invalid For Geting User Data",
                code: "INVALID_ID_FORMAT",
            });
        }
        return res.status(500).json({
            message: " ⭕🔴 Feild To Find UserID!, Occur Server Error",
            code: "INTERNAL_SERVER_ERROR",
            error: error.message,
        });
    }
};
export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        console.log(status);
        if (status == "online") await User.userOnline(req.user.userId);
        else await User.userOffline(req.user.userId);
        res.json({ message: "Status updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error updating status", error });
    }
};

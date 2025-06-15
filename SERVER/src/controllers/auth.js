import User from "#models/users.js";
import bcrypt from "bcrypt";
import { sign, signChat } from "#services/jwt.js";
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const avatar = `/assets/avatar/default_avatar.png`;
        if (!name && !email && !password)
            return res.status(401).json({
                message: "❌ Input valid credentials! Invalid input Data",
                code: "INVALID_INPUT_DATA",
                email,
                password,
            });
        const userId = await User.create({
            name,
            email,
            password: hashedPassword,
            avatar,
        });
        return res
            .status(201)
            .json({ message: "🟢 User created successfully", userId });
    } catch (error) {
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(400).json({
                message: "❌ Email already exists",
                code: "ALREADY_EXIST",
            });
        }
        return res.status(500).json({
            message:
                "⭕🔴 Faild To Create New User Account! Occur Responce Faild",
            code: "INTERNAL_SERVER_ERROR",
            error: error.message,
        });
    }
};
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email && !password)
            return res.status(401).json({
                message: "❌ Input valid credentials INvalid data",
                code: "INVALID_INPUT_DATA",
                email,
                password,
            });

        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(401).json({
                message:
                    "🙅‍♂️ Can't Match Email and Password!, Check Email and Password",
                code: "NO_MATCH_INPUT",
                email,
                password,
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                message:
                    "🙅‍♂️ Can't Match Email and Password!, Check Email and Password",
                code: "NO_MATCH_INPUT",
            });
        }
        const token = sign(user);
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 1000,
        });
        const tokenChat = signChat({
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            status: "online",
        });
        return res.json({
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                status: "online",
            },
            message: "🟢 Authantication Is Complete Your Are Login",
            tokenChat,
        });
    } catch (error) {
        return res.status(500).json({
            message: "⭕🔴 Faild To Login User! Responce Server Faild",
            code: "INTERNAL_SERVER_ERROR",
            error: error.message,
        });
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        });
        res.status(200).json({ message: "✅ Successfuly Logout!" });
    } catch (error) {
        const newLocal = "⭕🔴 Faild To Logout! Occur Server Faild";
        return res.status(500).json({
            message: newLocal,
            error: error.message,
        });
    }
};

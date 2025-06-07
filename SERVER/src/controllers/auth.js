import User from "#models/users.js";
import bcrypt from "bcrypt";
import { sign } from "#services/jwt.js";
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const avatar = `/assets/avatar/default_avatar.png`;
        if (!name && !email && !password)
            return res
                .status(401)
                .json({ message: "Input valid credentials", email, password });
        const userId = await User.create({
            name,
            email,
            password: hashedPassword,
            avatar,
        });
        return res
            .status(201)
            .json({ message: "User created successfully", userId });
    } catch (error) {
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(400).json({ message: "Email already exists" });
        }
        return res.status(500).json({
            message: "Error creating user",
            error: error.message,
        });
    }
};
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email && !password)
            return res
                .status(401)
                .json({ message: "Input valid credentials", email, password });

        const user = await User.findByEmail(email);
        if (!user) {
            return res
                .status(401)
                .json({ message: "Invalid credentials", email, password });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = sign(user);
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 10 * 60 * 1000,
        });
        return res.json({
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                status: "online",
            },
            message:"Successfuly Login"
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error logging in",
            error: error.message,
        });
    }
};

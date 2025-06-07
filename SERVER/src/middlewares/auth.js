import { verify } from "#services/jwt.js";

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res
                .status(401)
                .json({ message: "No token provided in cookies" });
        }
        const decoded = verify(token);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};
export default auth;

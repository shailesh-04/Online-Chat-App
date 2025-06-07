import jwt from "jsonwebtoken";

export const sign = (user) => {
    return jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        {
            expiresIn: "1m",
        }
    );
};

export const verify = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};

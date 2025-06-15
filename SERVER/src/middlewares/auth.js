import { verify } from "#services/jwt.js";
const auth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "❌ Authentication required",
        code: "NO_PROVIDE_TOKEN",
        detail: "No token found. Please log in to continue.",
      });
    }
    const decoded = verify(token);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      message: "🙅‍♂️  Authentication failed",
      detail: "Your session is invalid or has expired. Please log in again.",
      code: "INVALID_PROVIDE_TOKEN",
      error: error.message,
    });
  }
};

export default auth;

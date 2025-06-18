import { Router } from "express";
import users from "./users.js";
import auth from "./auth.public.js";
import authApi from "./auth.js";
import chatApi from "./chat.js";
import { catchErr } from "04-utils";
const router = Router();
try {
    router.use("/", auth);
    router.use("/api/user", users);
    router.use("/api/auth", authApi);
    router.use("/api/chat", chatApi);
    router.get("/api", (req, res) => {
        res.status(200).json({
            message: "The Api Is Successfuy Connect With Frontend!.",
        });
    });
} catch (error) {
    catchErr(error,"routes/_index.js")
}
export default router;

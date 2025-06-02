import { Router } from "express";
import users from "./users.js";
import auth from "./auth.public.js";
import authApi from "./auth.js";
const router = Router();
try {
    router.use("/", auth);
    router.use("/api/user", users);
    router.use("/api/auth", authApi);
} catch (error) {
    console.error(
        " \x1b[1m error : ~/routes/_index.js \x1b[33m  \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n \x1b[0m",
        error.message
    );
}
export default router;

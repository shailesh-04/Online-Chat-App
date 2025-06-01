import { Router } from "express";
import auth from "./auth.public.js";
import users from "./users.js";
const router = Router();
try {
    router.use("/", auth);
    router.use("/api", users);
} catch (error) {
    console.error(
        " \x1b[1m error : ~/routes/_index.js \x1b[33m  \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n \x1b[0m",
        error.message
    );
}
export default router;

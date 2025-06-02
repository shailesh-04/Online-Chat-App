import { Router } from "express";
import { getUser, updateStatus } from "#controllers/users.js";
import auth from "#middlewares/auth.js";
const router = Router();
try {
    router.use(auth);
    router.get("/me", getUser);
    router.put("/status", updateStatus);
} catch (error) {
    console.error(
        " \x1b[1m error : ~/routes/users.js \x1b[33m  \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n \x1b[0m",
        error.message
    );
}
export default router;

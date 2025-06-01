import { Router } from "express";
import authController from "#controllers/auth.public.js";
const auth = Router();
try {
    auth.get("/", authController.index);
    auth.post("/login", authController.login);
    auth.get("/logout", authController.logout);
} catch (error) {
    console.error(
        " \x1b[1m error : ~/routes/auth.js \x1b[33m  \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n \x1b[0m",
        error.message
    );
}
export default auth;

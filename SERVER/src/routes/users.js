import { Router } from "express";
import userController from "#controllers/users.js";
const users = Router();
try {
    users.get("/get", userController.get);

} catch (error) {
    console.error(
        " \x1b[1m error : ~/routes/users.js \x1b[33m  \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n \x1b[0m",
        error.message
    );
}
export default users;

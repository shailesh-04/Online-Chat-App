import { Router } from "express";
import { register ,login,logout} from "#controllers/auth.js";
const router = Router();
try {
    router.post('/register', register);
    router.post('/login', login);
    router.delete('/logout', logout);

} catch (error) {

    console.error(
        " \x1b[1m error : ~/routes/auth.js \x1b[33m  \n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n \x1b[0m",
        error.message
    );
        
}
export default router;

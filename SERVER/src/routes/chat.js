import { catchErr } from "04-utils";
import { Router } from "express";
import auth from "#middlewares/auth.js";
import controller from "#controllers/chat.js"
const router = Router();
try {
    router.use(auth);
    router.get("/conversations", controller.getConversations);
    router.get("/messages/:conversationId", controller.getMessages);
    router.post("/messages", controller.sendMessage);
    router.post("/conversations", controller.startConversation);
    router.get("/contacts", controller.getContacts);
    router.post("/contacts", controller.addContact);
} catch (error) {
    catchErr(error.message, "chat/router");
}
export default router;

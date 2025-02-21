import { Router } from "express";
import * as messageServices from "./message.controller.js";
import { auth } from "../../middleWare/auth.middleWare.js";
import { valid } from "../../middleWare/validation.js";
import { messageSchema } from "./message.validation.js";
import { errHandler } from "../../utils/errorHandler/errHandler.js";
const router = Router();
    router.post('/:receiverId',auth(),valid(messageSchema),errHandler(messageServices.createMessage))
    router.get('get-message/:messageId' ,auth() , errHandler(messageServices.getMessage ));
    router.delete('/:messageId' ,auth() , errHandler(messageServices.deleteMessage ));
    router.patch('/edit-message/:messageId' , auth() , errHandler(messageServices.editMessage));
    router.get('/get-all-messages' , auth() , errHandler(messageServices.getAllMessages))
export default router;
import { Router } from "express";
import * as messageServices from "./message.controller.js";
import { auth } from "../../middleWare/auth.middleWare.js";
import { valid } from "../../middleWare/validation.js";
import { messageSchema } from "./message.validation.js";
const router = Router();
    router.route('/')
    .post(auth(),valid(messageSchema),messageServices.createMessage)
    .get((req , res ,next)=>{
        return res.json({
            message : 'message route'
        })
    })
    router.get('/:messageId' ,auth() , messageServices.getMessage );
    router.delete('/:messageId' ,auth() , messageServices.deleteMessage );
    router.get('/get-messages' , auth() , messageServices.getAllMessages);
    router.patch('/edit-message/:messageId' , auth() , messageServices.editMessage);
export default router;
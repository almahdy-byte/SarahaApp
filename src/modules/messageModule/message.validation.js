import { generalValidation } from "../../middleWare/validation.js";
import Joi from "joi";
export const messageSchema = Joi.object({
    body: generalValidation.body.required(),
    senderId : generalValidation.id,
    receiverId : generalValidation.id,
})
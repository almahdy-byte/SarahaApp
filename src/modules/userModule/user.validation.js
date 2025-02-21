import Joi from "joi";
import { generalValidation } from "../../middleWare/validation.js";

export const userSchema= Joi.object({
    userName:generalValidation.userName.required(),
    email:generalValidation.email.required(),
    password:generalValidation.password.required(),
    role:generalValidation.role,
    phone:generalValidation.phone.required()
});
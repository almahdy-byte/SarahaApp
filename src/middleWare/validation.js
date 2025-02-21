import { StatusCodes } from "http-status-codes";
import Joi from "joi";
import { Types } from "mongoose";

export const valid = (schema)=>{
    return (req,res,next)=>{
        const data = {
            ...req.body,
            ...req.params,
            ...req.query    
        }
        const result = schema.validate(data);
        let errors = [];
        if(result.error){
            errors.push(result.error.details[0].message)
            return next(new Error(errors) , {cause:StatusCodes.BAD_REQUEST})  
        }
        next();
}
}
const idValidation =(id)=>{
    return Types.ObjectId.isValid(id) ? true : helper.message = "Invalid ID";
}

export const generalValidation = {
    userName: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string(),
    role: Joi.string().valid("admin","user").default("user"),
    phone: Joi.string().required(),
    body:Joi.string().min(1).max(500),
    id:Joi.custom(idValidation),
}
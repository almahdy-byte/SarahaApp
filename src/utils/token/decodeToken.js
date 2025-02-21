import { StatusCodes } from "http-status-codes";
import { verify } from "./verify.js";
import { Roles } from "../../DB/models/user.model.js";

export const decodeToken =(authorization , next)=>{
if(!authorization)
    next(new Error('authorization not sent' , {cause:StatusCodes.BAD_REQUEST}))
const parts = authorization.split(' ');
if(parts.length !==2)
    next(new Error('in-valid authorization' , {cause:StatusCodes.BAD_REQUEST}))
    const [barer , token] = parts;
        let signature ;
        switch (barer) {
            case Roles.user:
                signature = process.env.USER_TOKEN_KEY
                break;
            case Roles.admin:
                signature = process.env.ADMIN_TOKEN_KEY
            default:
                break;
        }
        return verify(token , signature);
}
import { Roles } from "../../DB/models/user.model.js"
import { sign } from "./sign.js";
export const createToken =(role , payload ={})=>{
    let signature ;
    switch (role) {
        case Roles.user:
            signature = process.env.USER_TOKEN_KEY
            break;
        case Roles.admin:
            signature = process.env.ADMIN_TOKEN_KEY
        default:
            break;
    }
    const token  = sign(payload , signature );
    return token;
}
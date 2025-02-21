import jwt from "jsonwebtoken";

export const verify = (token , signature = signature || process.env.USER_TOKEN_KEY)=>
    jwt.verify(token , signature)
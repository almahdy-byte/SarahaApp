import { StatusCodes } from "http-status-codes";
import userModel from "../DB/models/user.model.js";
import { errHandler } from '../utils/errorHandler/errHandler.js';
import { decodeToken } from '../utils/token/decodeToken.js';
export const auth = () => {
    return errHandler(async(req, res, next)=>{
        const authorization = req.headers['authorization'];
        const decodedToken = decodeToken(authorization , next);
        const user = await userModel.findById(decodedToken.id);
        if(!user)
            return next(new Error('user not found' , {cause:StatusCodes.NOT_FOUND}));
        req.user = user;
        next();
    })
};
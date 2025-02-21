import { StatusCodes } from "http-status-codes";

export const globalErrorHandler = (error , req ,res , next)=>{
    console.log('global middle ware');
    res.status(StatusCodes.BAD_REQUEST).json({error:error+""})
}
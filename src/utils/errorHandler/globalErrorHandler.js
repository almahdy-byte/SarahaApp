import { StatusCodes } from "http-status-codes";

export const globalErrorHandler = (error , req ,res , next)=>{
    console.log('global middle ware');
    return res.status(StatusCodes.BAD_REQUEST || cause).json({error:error+""})
}
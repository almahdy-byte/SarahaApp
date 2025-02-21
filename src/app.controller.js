import { StatusCodes } from "http-status-codes";
import {connection} from "./DB/connection.js"
import userRouter from "./modules/userModule/user.router.js";
import messageRouter from "./modules/messageModule/message.router.js";
import { globalErrorHandler } from "./utils/errorHandler/globalErrorHandler.js";
export const bootstrap =async(app , express)=>{
    app.use(express.json())
    await connection()
    app.use('/user' , userRouter);
    app.use('/message' , messageRouter);
    
    app.all("*",(req,res,next)=>{
        return next(new Error("page not found"),{cause:StatusCodes.NOT_FOUND})
    })
    app.use(globalErrorHandler)
}

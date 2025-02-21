import { StatusCodes } from "http-status-codes"

export const errHandler = (fun) => {
    return(req , res ,next)=>{
        fun(req,res,next)
        .catch(err=>{
            return next(new Error(err+"" || 'internal server error' ,{cause:StatusCodes.INTERNAL_SERVER_ERROR}))
        })
    }
}
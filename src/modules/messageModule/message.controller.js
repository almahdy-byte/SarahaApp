import messageModel from "../../DB/models/message.model.js";
import { StatusCodes } from "http-status-codes";
import userModel, { Roles } from "../../DB/models/user.model.js";


export const createMessage = async (req, res, next) => {
const { body , receiverId } = req.body;
const senderId = req.user._id;
const receiver = await userModel.findById(receiverId);
if(!receiver) return next(new Error("receiver not found"));
if(senderId.toString() === receiverId.toString()) return next(new Error("you can't send message to yourself"));
const message = new messageModel({ body , senderId , receiverId });
await message.save();
return res.status(StatusCodes.CREATED).send({messageSent : message , message:'message sent successfully'});
}
export const getMessage = async(req , res , next)=>{
    const {messageId} = req.params;
    const message = await messageModel.findOne({isDeleted : false , _id:messageId});
    const id = req.user._id;
    if(id.toString() !== message.senderId.toString() && id.toString()!== message.receiverId.toString) next(new Error ('you are not allowed to see this message') , {cause:StatusCodes.FORBIDDEN});  
    return res.status(StatusCodes.ACCEPTED).json({message});
}
export const getAllMessages =async(req , res ,next)=>{
    const id = req.user._id;
    const messages = await messageModel.find({receiverId:id}).populate([
        {
            path:'senderId',
            select:'userName email'
        },
        {
            path:'receiverId',
            select:'userName email'
        }
    ])
    return res.status(StatusCodes.ACCEPTED).json({messages})
}
export const editMessage = async(req , res , next)=>{
    const {messageId} = req.params;
    const {body} = req.body;
    const message = await messageModel.findOne({isDeleted : false , _id:messageId});
    const id = req.user._id;
    if(id.toString() !== message.senderId.toString())
        next(new Error ('you are not allowed to edit this message') , {cause:StatusCodes.FORBIDDEN});
    message.body = body || message.body;
    await message.save();
    return res.status(StatusCodes.ACCEPTED).json({message});
}
export const deleteMessage = async(req , res , next)=>{
    const {messageId} = req.params;
    const message = await messageModel.findOne({isDeleted : false , _id:messageId});
    const id = req.user._id;
    if(id.toString() !== message.senderId.toString() && id.toString()!== message.receiverId.toString&& req.user.role !==Roles.admin)
        next(new Error ('you are not allowed to delete this message') , {cause:StatusCodes.FORBIDDEN}); 
    await message.deleteOne({})
    return res.status(StatusCodes.ACCEPTED).json({message:'Deleted'});
}
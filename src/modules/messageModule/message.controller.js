import messageModel from "../../DB/models/message.model.js";
import { StatusCodes } from "http-status-codes";
import userModel, { Roles } from "../../DB/models/user.model.js";


export const sendMessage = async (req, res, next) => {

const {receiverId} = req.params;

const { body} = req.body;

const senderId = req.user._id;

const receiver = await userModel.findOne({_id: receiverId , confirmed:true});

if(!receiver) 
    return next(new Error("receiver not found"));

if(senderId.toString() === receiverId.toString()) 
    return next(new Error("you can't send message to yourself"));

const message = new messageModel({
     body ,
     senderId ,
     receiverId 
    });

return res
    .status(StatusCodes.CREATED)
    .json({messageSent : message , message:'message sent successfully'});
}
export const getMessage = async(req , res , next)=>{

    const {messageId} = req.params;

    const message = await messageModel.findOne({isDeleted : false , _id:messageId})

    const id = req.user._id;

    if(id.toString() !== message.senderId.toString() && id.toString()!== message.receiverId.toString) 
        next(new Error ('you are not allowed to see this message') , {cause:StatusCodes.FORBIDDEN});  

    await message.populate([
        {
            path:'receiverId',
            select:"userName email -_id"
        },
        {
            path:'senderId',
            select:"userName email -_id"
        }
    ]);

    return res.status(StatusCodes.ACCEPTED).json({message});
}
export const editMessage = async(req , res , next)=>{

    const {messageId} = req.params;

    const {body} = req.body;

    const message = await messageModel.findOne({isDeleted : false , _id:messageId});

    const id = req.user._id;

    if(id.toString() !== message.senderId.toString())
        return next(new Error ('you are not allowed to edit this message') , {cause:StatusCodes.FORBIDDEN});

    message.body = body || message.body;

    await message.save();

    return res.status(StatusCodes.ACCEPTED).json({message});
}
export const deleteMessage = async(req , res , next)=>{

    const {messageId} = req.params;

    const message = await messageModel.findOne({isDeleted : false , _id:messageId});

    const id = req.user._id;

    if(id.toString() !== message.senderId.toString() && id.toString()!== message.receiverId.toString&& req.user.role !==Roles.admin)
        return next(new Error ('you are not allowed to delete this message') , {cause:StatusCodes.FORBIDDEN}); 

    await message.deleteOne({})

    return res.status(StatusCodes.ACCEPTED).json({message:'Deleted'});
}

export const getAllMessages = async(req , res ,next)=>{

    const  receiverId = req.user._id;

    const messages = await messageModel.find({receiverId})
    .populate([
        {
            path:'senderId',
            select:'userName email'
        },
        {
            path:'receiverId',
            select:'userName email'
        }
    ])

    if(messages.length===0)
        return next(new Error("you don't have any message"))
    
    return res.status(StatusCodes.ACCEPTED).json({messages})
}
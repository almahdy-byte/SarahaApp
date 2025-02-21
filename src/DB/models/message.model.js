import { Schema, Types } from "mongoose";
import mongoose from "mongoose";
const messageSchema = new Schema({
    body:{
        type: String,
        required: true
    },
    senderId:{
        type:Types.ObjectId,
        ref:"User",
        required: true
    }
    ,
    receiverId:{
        type:Types.ObjectId,
        ref:"User",
        required: true
    } , 
    isDeleted:{
        type:Boolean,
        default:false
    }
} , {timestamps:true});


const messageModel = mongoose.model("Message", messageSchema);
export default messageModel;
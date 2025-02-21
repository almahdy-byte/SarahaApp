import mongoose, { Schema } from "mongoose";

export const Roles = {
    user:'user' , 
    admin:'admin'
}

Object.freeze(Roles)
const userSchema = new Schema({
    userName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        validate:{
            validator:(value)=>{
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)
            },
            message: props=>`${props.value} is not a valid email address`
        }
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        enum: ["admin","user"],
        default: "user"
    },
    phone:{
        type: String,
        required: true}
        
    ,
        confirmed:{
            type: Boolean,
            default: false
        },
        resetPasswordOTP:{
            type:String,
            default: "none"
        },
        confirmEmailOTP:{
            type:String,
            default: "none"
        }
}, {timestamps:true})

const userModel = mongoose.model("User", userSchema);
export default userModel;
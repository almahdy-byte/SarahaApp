import userModel from "../../DB/models/user.model.js";
import { encrypt } from "../../utils/crypt/encryption.js";
import { hash } from "../../utils/hash/hash.js";
import { StatusCodes } from "http-status-codes";
import { nanoid } from "nanoid";
import { createHtml } from "../../utils/sendEmail/sendEmail.js";
import { emailEmitter , subjects } from "../../utils/sendEmail/emailEmitter.js";
import { compare } from "../../utils/hash/compare.js";
import { createToken } from "../../utils/token/createToken.js";
import { Roles } from "../../middleWare/authorization.js";


export const register = async (req, res ,next) => {
    const { userName, email, password, role, phone } = req.body;
    const isEXisted = await userModel.findOne({ email });
    if (isEXisted) return next(new Error("Email is already existed"), { cause: StatusCodes.BAD_REQUEST });
    const hashedPassword = hash(password);
    const enPhone = encrypt(phone);
    const code = nanoid(6);
    const html = createHtml(subjects.confirmMail,code)
    const user = new userModel({ userName, email, password: hashedPassword, role : role|| Roles.user , phone: enPhone ,confirmEmailOTP : hash(code) });
    await user.save();
    emailEmitter.emit('confirmEmail' , {to:email , subject:subjects.confirmMail , html , text:'confirm email'});
    return res.status(StatusCodes.CREATED).send({ user  , message:'done and check your email'});
}

export const login = async (req, res ,next) => {
    const {email , password} = req.body;
    const user = await userModel.findOne({email});
    if(!user) return next(new Error("Email or password is incorrect"), { cause: StatusCodes.BAD_REQUEST });
    const isMatched = await compare(password , user.password)
    if(!isMatched)return next(new Error("Email or password is incorrect"), { cause: StatusCodes.BAD_REQUEST });
    if(user.confirmed === false) next(new Error("In-valid Code Email is not confirmed"), { cause: StatusCodes.BAD_REQUEST });
    const token =await createToken(user.role , {id : user._id})
    return res.status(StatusCodes.OK).send({user , message:'logged in successfully' , token});
}

export const update = async (req, res , next) => {
const user = req.user;
user.userName = req.body.userName || user.userName;
if(req.body.phone) user.phone = encrypt(req.body.phone)
await user.save();
return res.status(StatusCodes.OK).send({user , message:'updated successfully'});
}

export const confirmEmail = async (req, res , next) => {
    const {email , code} = req.body;
    const user = await userModel.findOne({email});
    if(!user) return next(new Error("Email is not existed"), { cause: StatusCodes.BAD_REQUEST });
    if(!compare(code , user.confirmEmailOTP)) return next(new Error("code is not correct"), { cause: StatusCodes.BAD_REQUEST });
    user.confirmed = true;
    user.confirmEmailOTP = undefined;
    await user.save();
    return res.status(StatusCodes.OK).send({user , message:'confirmed successfully'});
};

export const forgerPassword = async (req, res , next) => {
    const {email} = req.body;
    const user = await userModel.findOne({email});  
    if(!user) return next(new Error("Email is not existed"), { cause: StatusCodes.BAD_REQUEST });
    const code = nanoid(6);
    const html = createHtml(subjects.resetPassword,code)
    user.resetPasswordOTP = await hash(code);
    await user.save();
    emailEmitter.emit('resetPassword' , {to:email , subject:subjects.resetPassword , html , text:'use this code reset password'});
    return res.status(StatusCodes.ACCEPTED).json({
        message:'check your email'
    })
};

export const changePassword = async (req, res , next) => {
    const {email , code , password} = req.body;
    const user = await userModel.findOne({email});  
    if(!user) return next(new Error("Email is not existed"), { cause: StatusCodes.BAD_REQUEST });
    if(!compare(code , user.resetPasswordOTP)) return next(new Error("code is not correct"), { cause: StatusCodes.BAD_REQUEST });
    user.password = hash(password);
    user.resetPasswordOTP = undefined;
    await user.save();
    return res.status(StatusCodes.OK).send({user , message:'password changed successfully'});
}
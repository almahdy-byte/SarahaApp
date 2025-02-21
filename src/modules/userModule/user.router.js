import { Router } from "express";
import { valid } from "../../middleWare/validation.js";
import { userSchema } from "./user.validation.js";
import * as userServices from "./user.controller.js";
import { auth } from "../../middleWare/auth.middleWare.js";
import { authorizations , Roles } from "../../middleWare/authorization.js";
import { errHandler } from "../../utils/errorHandler/errHandler.js";
const router = Router();

router.post('/' , valid(userSchema),errHandler(userServices.register));
router.post('/login' ,errHandler(userServices.login));
router.patch('/' ,auth() ,authorizations(Roles.user), errHandler(userServices.update));
router.patch('/confirm-email' , errHandler(userServices.confirmEmail));
router.patch('/forget-password' , errHandler(userServices.forgerPassword));
router.patch('/change-password' , errHandler(userServices.changePassword));
export default router;
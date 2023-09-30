import Auser from "../models/Auser.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";

export const Login = async(req, res, next)=>{
    try {
        const {email, password} = req.body;
        const user = await Auser.findOne({email}).select("+password")
        if(!user)
            return next(new ErrorHandler("Invalid Email / Password", 404));
        
        const match = await bcrypt.compare(password, user.password)
        
        if(!match)
            return next(new ErrorHandler("Invalid Email/Password", 404))
        
        sendCookie(user, res, `Welcome Back ${user.name}`);

    } catch (error) {
        next(error);
    }
}

export const Register = (req, res)=>{}

export const Logout = (req, res)=>{}

export const GetDetail = (req, res)=>{}
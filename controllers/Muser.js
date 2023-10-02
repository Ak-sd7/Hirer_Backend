import Muser from "../models/Muser.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";

export const Login = async(req, res, next)=>{
    try {
        const {email, password} = req.body;
        const user = await Muser.findOne({email}).select("+password")
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

export const Register = async(req, res, next)=>{
    const {} = req.body;
    let user = await Muser.findOne({email});
    if(user)
        return new ErrorHandler("User Already Exists", 404);
    const hashp = await bcrypt.hash(password, 10);
    user = await Muser.create({});
    sendCookie(user, res, "Registered Successfully", 201);
    
}

export const Logout = (req, res)=>{}

export const GetDetail = (req, res)=>{}
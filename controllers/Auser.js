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

export const Register = async (req, res, next)=>{
    try {
        const {name, email, password, phoneNo, uniName, uniGpa, uniPass, linkedInUrl, resume, skills} = req.body;
        let user = await Auser.findOne({email});
        if(user)
            return next(new ErrorHandler("User already exist", 404));
        const hashPass = await bcrypt.hash(password, 10);
        user = await Auser.create({name, email, password, phoneNo, uniName, uniGpa, uniPass, linkedInUrl, resume, skills});
        sendCookie(user, res, "Registered Succesfully", 201);
    } catch (error) {
        next(error);
    }
}

export const Logout = (req, res)=>{
    res.status(200)
        .cookie("token", "", {
        expires:new Date(Date.now()),
        })
    .json({
        success:true,
        user:req.user
    })
}

export const GetDetail = (req, res)=>{
    res.status(200).json({
        success:true,
        user:req.user
    })
}


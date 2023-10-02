import jwt from "jsonwebtoken";
import Auser from "../models/Auser.js";
import Muser from "../models/Muser.js";

export const isAutha = async(req, res, next)=>{
    const {token} = req.cookies;

    if(!token){
        return res.status(404).json({
            success : false,
            message : "Login First"
        })
    }

    const decodedId = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await Auser.findById(decodedId._id);
    next();
}
export const isAuthm = async(req, res, next)=>{
    const {token} = req.cookies;

    if(!token){
        return res.status(404).json({
            success : false,
            message : "Login First"
        })
    }

    const decodedId = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await Muser.findById(decodedId._id);
    next();
}


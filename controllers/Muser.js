import Muser from "../models/Muser.js";
import JobPosting from "../models/JobPosting.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";

export const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await Muser.findOne({ email }).select("+password");
    if (!user) return next(new ErrorHandler("Invalid Email / Password", 404));

    const match = await bcrypt.compare(password, user.password);

    if (!match) return next(new ErrorHandler("Invalid Email/Password", 404));

    sendCookie(user, res, `Welcome Back ${user.name}`);
  } catch (error) {
    next(error);
  }
};

export const Register = async (req, res, next) => {
  try {
    const { name, email, password, companyName, phoneNo } = req.body;
    let user = await Muser.findOne({ email });
    if (user) return next(new ErrorHandler("User already exist", 404));
    const hashPass = await bcrypt.hash(password, 10);
    user = await Muser.create({
      name,
      email,
      password: hashPass,
      companyName,
      phoneNo,
    });
    sendCookie(user, res, "Registered Succesfully", 201);
  } catch (error) {
    next(error);
  }
};

export const Logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      user: req.user,
    });
};

export const GetDetail = (req, res) => {
  res.status(200).json({
    success: true,
    userDetail: req.user,
  });
};

export const JobPost = async (req, res, next) => {
    try {
      const { companyName, post, description, validity } = req.body;

      const hirerId = req.user._id;

      const jobPost = await JobPosting.create({
        companyName,
        post,
        description,
        validity,
        person: hirerId,
      });
	  sendCookie(jobPost, res, "Post Created Successfully", 201);
    } 
    catch (error) {
      next(error);
    }
};

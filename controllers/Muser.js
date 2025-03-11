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
    user: req.user,
  });
};

export const JobPost = async (req, res, next) => {
    try {
      const { 
        title, 
        company, 
        location, 
        employmentType, 
        experience, 
        salary, 
        description, 
        requirements, 
        benefits, 
        validity,
        person
    } = req.body;

      const hirerId = req.user._id;

      const jobPost = await JobPosting.create({ 
        title, 
        company, 
        location, 
        employmentType, 
        experience, 
        salary, 
        description, 
        requirements, 
        benefits, 
        validity, 
        person: hirerId
    });
	  sendCookie(jobPost, res, "Post Created Successfully", 201);
    } 
    catch (error) {
      next(error);
    }
};

export const JobUpdate = async(req, res, next) => {
    try {
      const jobId = req.params._id;
      console.log("id from param :", jobId);

      const jobPost = await JobPosting.findById(jobId);

      if (!jobPost) {
        return next(new ErrorHandler("Job post not found", 404));
      }

      const { 
        title, 
        company, 
        location, 
        employmentType, 
        experience, 
        salary, 
        description, 
        requirements, 
        benefits, 
        validity,
    } = req.body;

      if(!jobPost){
        return next(new ErrorHandler("JobPost not found", 404));
      }

      if(req.user._id.toString() !== jobPost.person.toString())
        return next(new ErrorHandler("Unauthorized user", 403));

      const updatePost = await JobPosting.findByIdAndUpdate (
        jobId, {
          title: title || jobPost.title,
          company: company || jobPost.company,
          location: location || jobPost.location,
          employmentType: employmentType || jobPost.employmentType,
          experience: experience || jobPost.experience,
          salary: salary || jobPost.salary,
          description: description || jobPost.description,
          requirements: requirements || jobPost.requirements,
          benefits: benefits || jobPost.benefits,
          validity: validity || jobPost.validity,
      },
        {new: true}
      )
      res.status(200).json({
        success: true,
        message: "Job post updated successfully",
        jobPost: updatePost
      });
    } catch (error) {
        next(error);
    }
}

export const GetAllPosts = async(req, res, next)=>{
  try {
    const jobPosts = await JobPosting.find({});
    res.status(200).json({
      success: true,
      count: jobPosts.length,
      posts: jobPosts
    });
  } catch (error) {
    next(error);
  }
}

export const GetPostsById = async(req, res, next) =>{
  try {
    const userId = req.params._id;
  
    const jobPostsById = await JobPosting.find({person: userId});
  
    if(jobPostsById.length===0) {
      return res.status(200).json({
        success: true,
        message: "No job posts are found",
        count: 0,
        posts: []
      })
    }
    
    res.status(200).json({
      success:true,
      count: jobPostsById.length,
      posts: jobPostsById
    });
  } catch (error) {
    next(error);
  }
}
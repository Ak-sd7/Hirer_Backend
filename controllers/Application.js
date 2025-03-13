import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";
import Auser from "../models/Auser.js";
import Muser from "../models/Muser.js";
import JobPosting from "../models/JobPosting.js";
import JobApplication from "../models/Applications.js";


export const InitializePost = async(req, res, next) => {
    try {
        const jobId = req.params._id;
        const exist = await JobPosting.findById({jobId});
        if(!exist)
            return next(new ErrorHandler("Job does not exist", 404));
    
        const hirer = req.user._id;
        if(exist.person.toString() !== hirer.toString())
            return next(new ErrorHandler("You are not authorized to access this route", 401));
    
        const applicationExist = await JobApplication.findOne({jobId});
        if(applicationExist)
            return next(new ErrorHandler("Application already exist", 400));
    
        const application = await JobApplication.create({
            jobId,
            recruiterId: hirer,
            applicantIds:[],
            status: "open"
        });
        res.status(201).json({
            success: true,
            message: "Application initialized",
            data: application
        })
    } catch (error) {
        next(error);        
    }
}

export const AddApplicant = async(req, res, next) => {
    try {
        const candidate = req.user._id, jobId = req.params._id;
        
        const exist = await JobPosting.findById({jobId});
        if(!exist)
            return next(new ErrorHandler("Job does not exist", 404));

        if(jobId.validity < Date.now())
            return next(new ErrorHandler("Job has expired", 400)); 
        
        const applicationExist = await JobApplication.findOne({jobId});
        if(!applicationExist) {
            await JobApplication.create({
                jobId,
                recruiterId: hirer,
                applicantIds:[],
                status: "open"
            });
        }

        if(!applicationExist.applicantIds.includes(candidate)) {
            applicationExist.applicantIds.push(candidate);
            applicationExist.updatedAt = Date.now();
            await applicationExist.save();

            res.status(201).json({
                success: true,
                message: "Application submitted successfully",
                data: applicationExist
            })
        }else{
            return next(new ErrorHandler("You have already applied for this job", 400));
        }

    } catch (error) {
        next(error);        
    }
}

export const GetAllApplicantsByJobId = async(req, res, next) => {
    try {
        const jobId = req.params._id;
        const application = await JobApplication.findOne({jobId});
        if(!application)
            return next(new ErrorHandler("Application does not exist", 404));

        const job = await JobPosting.findById(jobId);
        if(!job)
            return next(new ErrorHandler("Job does not exist", 404));

        if(job.person.toString() !== req.user._id.toString())
            return next(new ErrorHandler("You are not authorized to access this route", 401));
        
        application.populate("applicantIds", "name email phoneNo uniName uniGpa skills resume linkedInUrl");
        res.status(200).json({
            success: true,
            data: application
        });
    } catch (error) {
        next(error);
    }
}

export const GetAllApplicationsByUser = async(req, res, next) => {
    try {
        const applications = await JobApplication.find({applicantIds: req.user._id}).populate("jobId", "title company location employmentType experience salary description requirements benefits validity");
        res.status(200).json({
            success: true,
            count: applications.length,
            data: applications
        });    
    } catch (error) {
        next(error);
    }
}

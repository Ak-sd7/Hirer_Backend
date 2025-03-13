import mongoose from "mongoose";

const applicantschema = new mongoose.Schema({
    jobId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "JobPosting",
        required:true
    },
    recruiterId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Muser",
        required:true
    },
    applicantIds:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auser",
    }],
    staus:{
        type: String,
        enum: ["open", "reviewing", "closed"],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    },
    updatedAt: {
        type: Date,
        default: Date.now,
        required: true
    }
});

applicantschema.index({JobId:1});

const JobApplication = mongoose.model("JobApplication", applicantschema);

export default JobApplication;


import mongoose from "mongoose";

const jobPosting = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    company:{
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    employmentType:{
        type: String,
        required: true
    },
    experience:{
        type: Number,
        required: true
    },
    salary:{
        type: Number,
        required
    },
    description: {
        type: String,
        required: true
    },
    requirements:{
        type: String,
        required: false
    },
    benefits:{
        type: String,
        required: false
    },
    validity: {
        type: Date,
        required: true,
        expires:0 // automatic deletion of jobPost as the validity date is reached.
    },
    person: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Muser",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    }
})

const JobPosting = mongoose.model("JobPosting", jobPosting);

export default JobPosting;
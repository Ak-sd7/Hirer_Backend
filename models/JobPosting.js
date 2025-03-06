import mongoose from "mongoose";

const jobPosting = mongoose.Schema({
    companyName:{
        type: String,
        required: true
    },
    post:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    validity: {
        type: Date,
        required: true
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
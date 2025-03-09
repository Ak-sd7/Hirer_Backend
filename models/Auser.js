import mongoose from "mongoose";


const aschema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    }, 
    email:{
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        select: false,
        required: true
    },
    uniName:{
        type: String,
        required: true
    },
    uniGpa:{
        type: mongoose.Schema.Types.Decimal128,
        required: true
    },
    uniPass:{
        type: Number,
        required: true
    },
    linkedInUrl:{
        type: String,
        required:false
    },
    gitHubUrl:{
        type: String,
        required:false
    },
    resume:{
        type: String,
        required:false
    },
    skills:{
        type: [String],
        required:true
    },
    createdAt:{
        type: Date,
        default: Date.now,
        required: true
    }
})

const Auser = mongoose.model("Auser", aschema);

export default Auser;
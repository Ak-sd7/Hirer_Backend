import mongoose from "mongoose";

const mschema = new mongoose.Schema({
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
    companyName:{
        type: String,
        required: true
    },
    phoneNo:{
        type: Number,
        required: true
    },
    stipend:{
        type: Number,
        required: true
    },
    duration:{
        type: Number,
        required: true
    },
    skills:{
        type: [String],
        required:false
    },
    createdAt:{
        type: Date,
        default: Date.now,
        required: true
    }
})

const Muser = mongoose.model("Muser", mschema);

export default Muser;
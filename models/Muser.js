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
    CompanyName:{
        type: String,
        required: true
    },
    PhoneNo:{
        type: Number,
        required: true
    },
    Stipend:{
        type: Number,
        required: true
    },
    Duration:{
        type: Number,
        required: true
    },
    CreatedAt:{
        type: Date,
        default: Date.now,
        required: true
    }
})

const Muser = mongoose.model("Muser", mschema);

export default Muser;
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
    CreatedAt:{
        type: Date,
        default: Date.now,
        required: true
    }
})

const Auser = mongoose.model("Auser", aschema);

export default Auser;
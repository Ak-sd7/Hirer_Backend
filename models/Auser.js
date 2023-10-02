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
    UniName:{
        type: String,
        required: true
    },
    UniGpa:{
        type: mongoose.Schema.Types.Decimal128,
        required: true
    },
    UniPass:{
        type: Number,
        required: true
    },
    ProjectTitle:{
        type: String,
        required:false
    },
    skills:{
        type: [String],
        required:false
    },
    CreatedAt:{
        type: Date,
        default: Date.now,
        required: true
    }
})

const Auser = mongoose.model("Auser", aschema);

export default Auser;
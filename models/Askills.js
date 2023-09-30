import mongoose from "mongoose";

const askills = new mongoose.schema({
    skills:{
        type : String,
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Auser",
        required:true
    },
    CreatedAt:{
        type: Date,
        default: Date.now,
        required: true
    }
})
const Askills = mongoose.model("Askills", askills);

export default Askills;
import mongoose from "mongoose";

const mskills = new mongoose.schema({
    skills:{
        type : String,
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Muser",
        required:true
    },
    CreatedAt:{
        type: Date,
        default: Date.now,
        required: true
    }
})
const Mskills = mongoose.model("Mskills", mskills);

export default Mskills;
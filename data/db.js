import mongoose from "mongoose";

export const connectDB = ()=>{
    mongoose.connect(process.env.MONGO_URI, {dbName: "hirerAPI"})
    .then(()=>{console.log("connected successfully")})  
    .catch((e)=>{console.log(e)})
}
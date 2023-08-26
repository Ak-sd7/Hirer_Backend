import express from "express";
import auserRouter from "./routes/Auser.js"
import muserRouter from "./routes/Muser.js"
import { config } from "dotenv";
import cookieParser from "cookie-parser";
export const app = express();

config({
    path:"./data/config.env"
});

// middlewares
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/ausers", auserRouter);
app.use("/api/v1/musers", muserRouter);

app.get("/", (req, res)=>{
    res.send("hello");
})
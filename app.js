import express from "express";
import auserRouter from "./routes/Auser.js"
import muserRouter from "./routes/Muser.js"
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";

export const app = express();

config({
    path:"./data/config.env"
});

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: [process.env.FRONTEND_URL],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);
console.log(process.env.FRONTEND_URL);
//Routes
app.use("/api/v1/ausers", auserRouter);
app.use("/api/v1/musers", muserRouter);

app.get("/", (req, res)=>{
    res.send("hello");
})
//error handler
app.use(errorMiddleware);

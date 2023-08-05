import express from "express";
import { config } from "dotenv";

export const app = express();

config({
    path:"./data/config.env"
});

// middlewares
app.use(express.json());

app.get("/", (req, res)=>{
    res.send("hello");
})
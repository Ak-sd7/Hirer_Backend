import express from "express";
import { GetDetail, Login, Logout, Register } from "../controllers/Muser.js";

const router = express.Router();

router.post("/new", Register)

router.post("/login", Login)

router.get("/logout", Logout)

// router.get("/me", isAuthenticated, GetDetail)

router.get("/me", GetDetail)


export default router;
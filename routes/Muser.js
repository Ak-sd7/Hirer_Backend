import express from "express";
import { GetDetail, Login, Logout, Register, JobPost, JobUpdate} from "../controllers/Muser.js";
import { isAuthm } from "../middlewares/auth.js";

const router = express.Router();

router.post("/new", Register)

router.post("/login", Login)

router.get("/logout", Logout)

router.get("/me", isAuthm, GetDetail)

router.post("/jobPost/create", isAuthm, JobPost);

router.put("/jobPost/update/:_id", isAuthm, JobUpdate);

export default router;
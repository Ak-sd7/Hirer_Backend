import express  from 'express';
import { AddApplicant, GetAllApplicantsByJobId, InitializePost, GetAllApplicationsByUser } from '../controllers/Application.js';
import { isAutha, isAuthm } from '../middlewares/auth.js';

const router = express.Router();

router.post("/create/:_id", isAuthm, InitializePost);

router.post("/addApplicant/:_id", isAutha, AddApplicant);

router.get("/allApplicantsByJobId/:_id", isAuthm, GetAllApplicantsByJobId);

router.get("/allApplicationsByUser", isAutha, GetAllApplicationsByUser);
 

export default router;
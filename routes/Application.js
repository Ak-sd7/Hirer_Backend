import express  from 'express';
import { AddApplicant, GetAllApplicantsByJobId, InitializePost } from '../controllers/Application';
import { isAutha, isAuthm } from '../middlewares/auth';

const router = express.Router();

router.post("/create/:_id", isAuthm, InitializePost);

router.post("/addApplicant/:_id", isAutha, AddApplicant);

router.get("/allApplicantsByJobId", isAuthm, GetAllApplicantsByJobId);

 

export default router;
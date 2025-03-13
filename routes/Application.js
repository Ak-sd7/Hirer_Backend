import express  from 'express';
import { AddApplicant, GetAllApplicantsByJobId, InitializePost } from '../controllers/Application';

const router = express.Router();

router.post("/create", InitializePost);

router.post("/addApplicant", AddApplicant);

router.get("/allApplicantsByJobId", GetAllApplicantsByJobId);

 

export default router;
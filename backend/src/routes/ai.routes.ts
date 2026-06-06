import { Router } from "express";
import { generatePaper } from "../controllers/ai.controller";

const router = Router();

router.post("/generate", generatePaper);

export default router;
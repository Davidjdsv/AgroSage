import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { generatePlan } from "../controllers/planController.js";

const router = express.Router();

router.post("/generate-plan", verifyToken, generatePlan);

export default router;

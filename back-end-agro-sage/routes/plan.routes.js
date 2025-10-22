import express from "express";
// ISSUE: Changed 'verifyToken' to the actual exported middleware function name, 'validarJWT'.
import { validarJWT } from "../middlewares/token.js";
import { generatePlan } from "../controllers/planController.js";

const router = express.Router();

// Using the correctly imported middleware
router.post("/generate-plan", validarJWT, generatePlan);

export default router;

import express from "express";
import { validarJWT } from "../middlewares/token.js";
import { generatePlan } from "../controllers/planController.js";

const router = express.Router();

router.post("/generate-plan", validarJWT, generatePlan);

export default router;
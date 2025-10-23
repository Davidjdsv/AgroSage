// routes/aiRoutes.js

import express from 'express';
import { generatePlan } from '../controllers/planController.js'; // Tu controller existente
import { askChat } from '../controllers/chatController.js';     // 🚀 Tu nuevo controller
import { validarJWT } from "../middlewares/token.js";
const router = express.Router();

// Solo requiere el 'prompt' y limita la conversación al tema agrícola
router.post('/ask',  validarJWT, askChat); 

export default router;
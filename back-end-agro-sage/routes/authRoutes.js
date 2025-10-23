import { Router } from 'express';
const router = Router();
import { registerAgricultor, loginAgricultor } from '../controllers/authController.js';

// Ruta POST para el registro de nuevos agricultores
// URL: /api/auth/register
router.post('/register', registerAgricultor);

// Ruta POST para el inicio de sesión
// URL: /api/auth/login
router.post('/login', loginAgricultor);

export default router;

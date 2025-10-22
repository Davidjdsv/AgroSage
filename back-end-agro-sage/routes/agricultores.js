// routes/agricultores.routes.js
import { Router } from 'express';
import { createAgricultor, loginAgricultor } from '../controllers/agricultores.controller.js';
import { validarJWT } from '../middlewares/token.js';

const router = Router();

router.post('/registro', createAgricultor);
router.post('/login', loginAgricultor);

// Ejemplo de ruta protegida
router.get('/perfil', validarJWT, (req, res) => {
  res.json({
    msg: 'Perfil del agricultor autenticado',
    agricultor: req.agricultor
  });
});

export default router;

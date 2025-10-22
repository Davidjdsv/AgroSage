import jwt from 'jsonwebtoken';
import { Agricultores } from '../models/index.js';

// ───────────────────────────────
// Generar token
// ───────────────────────────────
export const generarJWT = (cedula) => {
  return new Promise((resolve, reject) => {
    const payload = { cedula }; // usamos cedula (identificador del agricultor)

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_TIME || '24h' },
      (err, token) => {
        if (err) {
          console.error(err);
          reject('No se pudo generar el token');
        } else {
          resolve(token);
        }
      }
    );
  });
};

// ───────────────────────────────
// Validar token
// ───────────────────────────────
export const validarJWT = async (req, res, next) => {
  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({
      msg: 'No hay token en la petición',
    });
  }

  try {
    // Verificar token
    const { cedula } = jwt.verify(token, process.env.JWT_SECRET);

    // Buscar agricultor por cedula
    const agricultor = await Agricultores.findOne({ where: { cedula } });

    if (!agricultor) {
      return res.status(401).json({
        msg: 'Token no válido - agricultor no existe en la base de datos',
      });
    }

    // Si el modelo tuviera una columna "estado" podrías verificarla aquí:
    // if (agricultor.estado === 0) {
    //   return res.status(401).json({ msg: 'Token no válido - agricultor inactivo' });
    // }

    // Adjuntar agricultor al request (útil para controladores posteriores)
    req.agricultor = agricultor;

    next();
  } catch (error) {
    console.error('Error validando JWT:', error);
    res.status(401).json({
      msg: 'Token no válido',
    });
  }
};

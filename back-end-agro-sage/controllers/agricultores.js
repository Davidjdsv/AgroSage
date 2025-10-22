import { Agricultores } from '../models/agricultores.js';
import { generarJWT } from '../middlewares/token.js';
import bcrypt from 'bcryptjs';

/**
 * Crear un nuevo agricultor (registro)
 */
export const createAgricultor = async (req, res) => {
  try {
    const {
      nombre_completo,
      cedula,
      telefono_contacto,
      direccion,
      barrio_vereda,
      ciudad,
      departamento,
      municipio,
      contrasena
    } = req.body;

    // Verificar si ya existe un agricultor con la misma cédula
    const existe = await Agricultores.findOne({ where: { cedula } });
    if (existe) {
      return res.status(400).json({
        success: false,
        message: 'Ya existe un agricultor con esa cédula'
      });
    }

    // Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(contrasena, salt);

    // Crear agricultor
    const nuevoAgricultor = await Agricultores.create({
      nombre_completo,
      cedula,
      telefono_contacto,
      direccion,
      barrio_vereda,
      ciudad,
      departamento,
      municipio,
      contrasena: hashedPassword
    });

    // Responder sin contraseña
    res.status(201).json({
      success: true,
      message: 'Agricultor creado exitosamente',
      data: {
        id_agricultor: nuevoAgricultor.id_agricultor,
        nombre_completo: nuevoAgricultor.nombre_completo,
        cedula: nuevoAgricultor.cedula,
        ciudad: nuevoAgricultor.ciudad
      }
    });

  } catch (error) {
    console.error('Error en createAgricultor:', error);
    res.status(500).json({
      success: false,
      message: 'Error al crear agricultor'
    });
  }
};

/**
 * Iniciar sesión (login)
 */
export const loginAgricultor = async (req, res) => {
  try {
    const { cedula, contrasena } = req.body;

    // Buscar agricultor por cédula
    const agricultor = await Agricultores.findOne({ where: { cedula } });

    if (!agricultor) {
      return res.status(400).json({
        success: false,
        msg: 'Credenciales inválidas - agricultor no encontrado'
      });
    }

    // Verificar contraseña
    const passwordValido = await bcrypt.compare(contrasena, agricultor.contrasena);
    if (!passwordValido) {
      return res.status(400).json({
        success: false,
        msg: 'Credenciales inválidas - contraseña incorrecta'
      });
    }

    // Generar token JWT
    const token = await generarJWT(agricultor.cedula);

    res.json({
      success: true,
      msg: 'Inicio de sesión exitoso',
      agricultor: {
        id_agricultor: agricultor.id_agricultor,
        nombre_completo: agricultor.nombre_completo,
        cedula: agricultor.cedula,
        ciudad: agricultor.ciudad
      },
      token
    });

  } catch (error) {
    console.error('Error en loginAgricultor:', error);
    res.status(500).json({
      success: false,
      msg: 'Error en el servidor al iniciar sesión'
    });
  }
};

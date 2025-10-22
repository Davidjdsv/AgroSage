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
      telefono_movil,
      direccion,
      barrio_vereda,
      ciudad,
      departamento,
      municipio,
      contrasena
    } = req.body;

    // Validar campos obligatorios
    if (!nombre_completo || !cedula || !telefono_movil || !direccion || !barrio_vereda || !ciudad || !departamento || !municipio || !contrasena) {
      return res.status(400).json({
        success: false,
        message: 'Todos los campos son obligatorios'
      });
    }

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
      telefono_movil,
      direccion,
      barrio_vereda,
      ciudad,
      departamento,
      municipio,
      contrasena: hashedPassword
    });

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
    console.error('❌ Error en createAgricultor:', error);
    res.status(500).json({
      success: false,
      message: 'Error al crear agricultor',
      error: error.message
    });
  }
};

/**
 * Iniciar sesión (login)
 */
export const loginAgricultor = async (req, res) => {
  try {
    const { cedula, contrasena } = req.body;

    console.log('🔐 INTENTO DE LOGIN:', { cedula, contrasena });

    if (!cedula || !contrasena) {
      return res.status(400).json({
        success: false,
        msg: 'Debe ingresar cédula y contraseña'
      });
    }

    // Buscar agricultor por cédula
    const agricultor = await Agricultores.findOne({ where: { cedula } });
    
    console.log('👨‍🌾 Resultado búsqueda:', agricultor ? 'ENCONTRADO' : 'NO ENCONTRADO');

    if (!agricultor) {
      return res.status(400).json({
        success: false,
        msg: 'Credenciales inválidas - agricultor no encontrado'
      });
    }

    // 🔍 DEPURACIÓN DETALLADA
    console.log('--- DEPURACIÓN ---');
    console.log('📝 Contraseña ingresada:', contrasena);
    console.log('🔐 Hash en BD:', agricultor.contrasena);
    console.log('📏 Longitud hash BD:', agricultor.contrasena?.length);
    console.log('✅ Formato bcrypt válido:', agricultor.contrasena?.startsWith('$2'));

    // Verificar si el hash está truncado
    if (agricultor.contrasena && agricultor.contrasena.length < 50) {
      console.log('⚠️  POSIBLE TRUNCAMIENTO: El hash parece estar truncado');
    }

    // Verificar contraseña
    let passwordValido = false;
    try {
      passwordValido = await bcrypt.compare(contrasena, agricultor.contrasena);
      console.log('🔑 Resultado comparación bcrypt:', passwordValido);
    } catch (bcryptError) {
      console.log('❌ Error en bcrypt.compare:', bcryptError.message);
      
      // Fallback: comparación directa (solo para debugging)
      const fallbackCheck = contrasena === agricultor.contrasena;
      console.log('🔄 Fallback (comparación directa):', fallbackCheck);
    }

    if (!passwordValido) {
      return res.status(400).json({
        success: false,
        msg: 'Credenciales inválidas - contraseña incorrecta'
      });
    }

    // Generar token JWT
    const token = await generarJWT(agricultor.cedula);

    console.log('✅ LOGIN EXITOSO para:', agricultor.nombre_completo);

    return res.status(200).json({
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
    console.error('❌ Error en loginAgricultor:', error);
    return res.status(500).json({
      success: false,
      msg: 'Error en el servidor al iniciar sesión',
      error: error.message
    });
  }
};
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Agricultor from "../models/Agricultor.js";

// Registrar agricultor
export const registerAgricultor = async (req, res) => {
try {
const {
nombre_completo,
cedula,
telefono_movil,
direccion,
barrio_vereda,
departamento,
municipio,
contrasena
} = req.body;

// 1. Verificar si ya existe la cédula
const existingUser = await Agricultor.findOne({ where: { cedula } });
if (existingUser) {
return res.status(400).json({ message: "La cédula ya está registrada" });
}

// 2. Hashear contraseña
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(contrasena, salt);

// 3. Crear y guardar el nuevo agricultor en la base de datos (USANDO LOS DATOS DEL BODY)
const newAgricultor = await Agricultor.create({
nombre_completo,
cedula,
telefono_movil,
direccion,
barrio_vereda,
departamento,
municipio,
contrasena: hashedPassword,
});

res.status(201).json({ message: "Agricultor registrado", agricultor: newAgricultor });
} catch (error) {
console.error("Error en registro:", error);
res.status(500).json({ message: "Error al registrar agricultor" });
}
};

// Login agricultor
export const loginAgricultor = async (req, res) => {
try {
const { cedula, contrasena } = req.body;

// Buscar agricultor por cédula
const agricultor = await Agricultor.findOne({ where: { cedula } });
if (!agricultor) {
return res.status(400).json({ message: "Cédula o contraseña incorrecta" });
}

// Verificar contraseña
const isMatch = await bcrypt.compare(contrasena, agricultor.contrasena);
if (!isMatch) {
return res.status(400).json({ message: "Cédula o contraseña incorrecta" });
}

// Crear JWT
const token = jwt.sign(
{ id_agricultor: agricultor.id_agricultor, cedula: agricultor.cedula },
process.env.JWT_SECRET || "secretkey", // Usa una clave segura y única
{ expiresIn: "1h" }
);

res.json({ message: "Login exitoso", token });
} catch (error) {
console.error("Error en login:", error);
res.status(500).json({ message: "Error al iniciar sesión" });
}
};
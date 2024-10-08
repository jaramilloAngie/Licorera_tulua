const userModel = require("../../models/userModel");
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Para las variables de entorno

// Almacenar códigos de verificación temporalmente
const verificationCodes = {};

// Controlador para solicitar la recuperación de contraseña
async function forgotPasswordController(req, res) {
    try {
        const { email } = req.body;

        // Verificar si el usuario existe en la base de datos
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "El correo no está registrado.",
            });
        }

        // Generar un código de verificación
        const newVerificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        verificationCodes[email] = newVerificationCode;

        // Configurar el servicio de correo
        const transporter = nodemailer.createTransport({
            service: 'gmail', // o tu proveedor de correo
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Enviar el código de verificación por correo electrónico
        try {
            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Código de recuperación de contraseña',
                text: `Tu código de verificación es: ${newVerificationCode}`,
            });

            return res.status(200).json({
                success: true,
                message: "Código de verificación enviado al correo electrónico.",
            });
        } catch (error) {
            console.error("Error al enviar el correo:", error);
            return res.status(500).json({
                success: false,
                message: "Error al enviar el código de verificación.",
                error: error.message,
            });
        }
    } catch (err) {
        console.error("Error en el controlador de recuperación de contraseña:", err);
        return res.status(500).json({
            message: "Error del servidor",
            success: false,
        });
    }
}

// Controlador para restablecer la contraseña
async function resetPasswordController(req, res) {
    try {
        const { email, verificationCode, newPassword } = req.body;

        // Validar el código de verificación
        if (verificationCodes[email] && verificationCodes[email] === verificationCode) {
            delete verificationCodes[email]; // Eliminar el código después de validarlo

            // Verificar si el usuario existe
            const user = await userModel.findOne({ email });
            if (!user) {
                return res.status(400).json({
                    success: false,
                    message: "El usuario no existe.",
                });
            }

            // Encriptar la nueva contraseña
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);

            // Actualizar la contraseña del usuario
            user.password = hashedPassword;
            await user.save();

            return res.status(200).json({
                success: true,
                message: "Contraseña actualizada correctamente.",
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "Código de verificación incorrecto.",
            });
        }
    } catch (err) {
        console.error("Error en el controlador de restablecimiento de contraseña:", err);
        return res.status(500).json({
            message: "Error del servidor",
            success: false,
        });
    }
}

module.exports = { forgotPasswordController, resetPasswordController };

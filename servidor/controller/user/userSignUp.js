const userModel = require("../../models/userModel");
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
require('dotenv').config(); // Asegúrate de tener dotenv instalado y configurado

// Almacenar códigos de verificación temporalmente
const verificationCodes = {};
const existe = 0;

async function userSignUpController(req, res) {
    try {
        const { name, email, password, verificationCode } = req.body;
        const existingUser = await userModel.findOne({ email });
        // Validar que el email y el código de verificación se proporcionen si se está verificando el código
        if (verificationCode) {
            if (!email) {
                return res.status(400).json({
                    success: false,
                    message: "El email es obligatorio para verificar el código.",
                });
            }

            // Validar el código
            if (verificationCodes[email] && verificationCodes[email] === verificationCode) {
                delete verificationCodes[email]; // Eliminar el código después de validarlo

                // Continuar con el registro
                const salt = await bcrypt.genSalt(10);
                const hashPassword = await bcrypt.hash(password, salt);

                const payload = {
                    name,
                    email,
                    role: "Cliente",
                    password: hashPassword,
                };

                const userData = new userModel(payload);
                const saveUser = await userData.save();

                return res.status(201).json({
                    data: saveUser,
                    success: true,
                    message: "Usuario creado exitosamente",
                });
            } else {
                return res.status(400).json({
                    success: false,
                    message: "Código de verificación incorrecto",
                });
            }
        }

        // Si el código no se ha proporcionado, generar y enviar el código
        
        if (existingUser) {
            if (existe===1){
                return res.status(400).json({
                    success: false,
                    message: "El email ya está en uso",
                });
            }else{
                return res.status(400).json({
                    success: true,
                    message: "Usuario creado exitosamente",
            })
            
        }}

        // Validaciones de campos requeridos
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Por favor, complete todos los campos requeridos",
            });
        }

        // Validar el formato del correo electrónico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Por favor, introduce un correo electrónico válido",
            });
        }

        // Generar un código de verificación
        const newVerificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        verificationCodes[email] = newVerificationCode;

        // Configurar el transporter para enviar correos electrónicos
        const transporter = nodemailer.createTransport({
            service: 'gmail', // o tu proveedor de correo
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Enviar el código de verificación
        try {
            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Código de verificación',
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
                message: "Error al enviar el código de verificación",
                error: error.message,
            });
        }

    } catch (err) {
        console.error("Error en el controlador:", err);
        return res.status(500).json({
            message: "Error del servidor",
            success: false,
        });
    }
}

module.exports = userSignUpController;

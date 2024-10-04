// controllers/sendVerificationCodeController.js
const VerificationCode = require('../models/verificationCodeModel');
const sendVerificationEmail = require('../services/emailService');
const crypto = require('crypto');

const sendVerificationCodeController = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) {
      throw new Error('El correo es obligatorio');
    }

    // Generar un código de verificación aleatorio
    const code = crypto.randomBytes(3).toString('hex').toUpperCase();

    // Establecer la fecha de expiración (por ejemplo, 10 minutos)
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 10);

    // Guardar el código en la base de datos
    await VerificationCode.create({ email, code, expiresAt });

    // Enviar el correo con el código
    await sendVerificationEmail(email, code);

    res.json({
      message: 'Código de verificación enviado al correo',
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
};

module.exports = sendVerificationCodeController;

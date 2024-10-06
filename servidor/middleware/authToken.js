const jwt = require('jsonwebtoken');

async function authToken(req, res, next) {
    try {
        // Verificar si existe el token en las cookies
        const token = req.cookies?.token;

        console.log("Token recibido:", token);
        
        if (!token) {
            // Si no hay token, se solicita iniciar sesión
            return res.status(401).json({
                message: "Por favor inicie sesión para continuar",
                error: true,
                success: false
            });
        }

        // Verificar el token usando la clave secreta del servidor
        jwt.verify(token, process.env.TOKEN_SECRET_KEY, function(err, decoded) {
            if (err) {
                // Si hay un error de verificación (token inválido o expirado)
                console.log("Error de autenticación:", err);
                return res.status(403).json({
                    message: "Token inválido o expirado. Por favor inicie sesión nuevamente.",
                    error: true,
                    success: false
                });
            }

            // Si el token es válido, se almacena el userId para su uso en las siguientes rutas
            req.userId = decoded?._id;
            next(); // Se continúa con la siguiente función de middleware o ruta

        });

    } catch (err) {
        // Manejo de errores inesperados
        res.status(500).json({
            message: err.message || "Error en el servidor.",
            data: [],
            error: true,
            success: false
        });
    }
}

module.exports = authToken;

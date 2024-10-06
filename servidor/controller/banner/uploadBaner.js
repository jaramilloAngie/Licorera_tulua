const uploadBannerPermission = require("../../helpers/permission") // Verificación de permisos
const bannerModel = require("../../models/bannerModel") // Modelo del banner

async function UploadBannerController(req, res) {
    try {
        const sessionUserId = req.userId // Obtener el ID del usuario de la sesión

        // Verificar si el usuario tiene permiso para subir un banner
        if (!uploadBannerPermission(sessionUserId)) {
            throw new Error("Permiso denegado")
        }

        // Crear una nueva instancia del modelo de banners con los datos del cuerpo de la solicitud
        const uploadBanner = new bannerModel(req.body)
        const saveBanner = await uploadBanner.save() // Guardar el banner en la base de datos

        // Responder con éxito si el banner se subió correctamente
        res.status(201).json({
            message: "Banner subido con éxito",
            error: false,
            success: true,
            data: saveBanner
        })

    } catch (err) {
        // Manejar errores y responder con el mensaje adecuado
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = UploadBannerController

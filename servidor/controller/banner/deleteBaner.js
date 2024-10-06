// controllers/banner/deleteBanner.js
const bannerModel = require("../../models/bannerModel"); // Cambia esto según tu estructura de archivos

async function deleteBanner(req, res) {
    try {
        const bannerId = req.body.id; // Obtener el ID del banner desde el cuerpo de la solicitud

        // Buscar y eliminar el banner por su ID
        const deletedBanner = await bannerModel.findByIdAndDelete(bannerId);

        // Verificar si el banner existía y fue eliminado
        if (!deletedBanner) {
            return res.status(404).json({
                message: "Banner no encontrado",
                error: true,
                success: false
            });
        }

        // Responder con éxito si el banner se eliminó correctamente
        res.status(200).json({
            message: "Banner eliminado con éxito",
            error: false,
            success: true,
            data: deletedBanner
        });
    } catch (err) {
        // Manejar errores y responder con el mensaje adecuado
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}

module.exports = deleteBanner;


const bannerModel = require("../../models/bannerModel"); // Cambia esto según tu estructura de archivos

async function allBanners(req, res) {
    try {
        console.log("userid all Banners", req.userId); // Log del ID del usuario, si lo necesitas

        const allBanners = await bannerModel.find(); // Busca todos los banners en la base de datos
        
        res.json({
            message: "Todos los banners",
            data: allBanners,
            success: true,
            error: false
        });
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}

module.exports = allBanners;

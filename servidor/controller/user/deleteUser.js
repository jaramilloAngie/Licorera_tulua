const userModel = require("../../models/userModel");
const cartProduct = require("../../models/cartProduct"); // Modelo de productos en el carrito

const deleteUser = async (req, res) => {
    try {
        const currentUserId = req.userId; // ID del usuario que está haciendo la solicitud
        const userModelId = req.body._id; // ID del usuario a eliminar

        // Validar que el ID del usuario a eliminar es proporcionado
        if (!userModelId) {
            return res.status(400).json({
                message: "El ID del usuario es requerido.",
                error: true,
                success: false
            });
        }

        // Intentar eliminar el usuario
        const deleteResult = await userModel.deleteOne({ _id: userModelId });

        // Comprobar si se eliminó algún documento
        if (deleteResult.deletedCount === 0) {
            return res.status(404).json({
                message: "Usuario no encontrado.",
                error: true,
                success: false
            });
        }

        // Eliminar todos los productos en el carrito relacionados con el usuario
        const deleteCartItems = await cartProduct.deleteMany({ userId: userModelId });

        // Responder con éxito, incluyendo la eliminación de los productos del carrito
        res.json({
            message: "Usuario y sus productos del carrito eliminados exitosamente.",
            error: false,
            success: true,
            data: {
                userDeleteResult: deleteResult,
                cartItemsDeleteResult: deleteCartItems
            }
        });

    } catch (err) {
        res.status(500).json({
            message: err?.message || "Error al eliminar el usuario.",
            error: true,
            success: false
        });
    }
};

module.exports = deleteUser;

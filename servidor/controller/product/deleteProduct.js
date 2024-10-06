const productModel = require("../../models/productModel");
const cartProduct = require("../../models/cartProduct"); // Modelo de productos en el carrito

const deleteProduct = async (req, res) => {
    try {
        const productId = req.body._id; // ID del producto a eliminar

        // Validar que el ID del producto sea proporcionado
        if (!productId) {
            return res.status(400).json({
                message: "El ID del producto es requerido.",
                error: true,
                success: false
            });
        }

        // Intentar eliminar el producto
        const deleteProductResult = await productModel.deleteOne({ _id: productId });

        // Comprobar si se eliminó algún documento
        if (deleteProductResult.deletedCount === 0) {
            return res.status(404).json({
                message: "Producto no encontrado.",
                error: true,
                success: false
            });
        }

        // Eliminar todas las referencias del producto en el carrito
        const deleteCartItems = await cartProduct.deleteMany({ productId: productId }); // Asegúrate de que `cartProduct` tiene el campo `productId`

        // Responder con éxito, incluyendo la eliminación de las referencias
        res.json({
            message: "Producto y sus referencias en carrito eliminados exitosamente.",
            error: false,
            success: true,
            data: {
                productDeleteResult: deleteProductResult,
                cartItemsDeleteResult: deleteCartItems,
            }
        });

    } catch (err) {
        res.status(500).json({
            message: err?.message || "Error al eliminar el producto.",
            error: true,
            success: false
        });
    }
};

module.exports = deleteProduct;


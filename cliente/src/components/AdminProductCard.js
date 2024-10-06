import React, { useState } from 'react';
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';
import displayCOPCurrency from '../helpers/displayCurrency';
import { toast } from 'react-toastify';
import SummaryApi from "../common"; // Asegúrate de tener configurada tu API en este archivo

const AdminProductCard = ({ data, fetchdata }) => {
    const [editProduct, setEditProduct] = useState(false);

    // Función para eliminar el producto
    const deleteProduct = async () => {
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este producto?");
        if (confirmDelete) {
            try {
                const response = await fetch(SummaryApi.deleteProduct.url, {
                    method: SummaryApi.deleteProduct.method,
                    credentials : 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ _id: data._id }) // Enviar el ID del producto a eliminar
                });

                const result = await response.json();

                if (result.success) {
                    toast.success("Producto eliminado exitosamente.");
                    fetchdata(); // Refrescar los productos tras eliminar
                } else {
                    // Manejo de errores basado en la respuesta del servidor
                    toast.error(result.message || "Error al eliminar el producto.");
                }
            } catch (error) {
                console.error("Error al eliminar:", error);
                toast.error("Error al eliminar el producto. Verifica tu conexión.");
            }
        }
    };

    return (
        <div className='bg-white p-4 rounded-2xl shadow flex border-2 border-green-600'>
            <div className='w-40'>
                <div className='w-32 h-32 flex justify-center items-center'>
                    <img src={data?.productImage[0]} alt={data.productName} className='mx-auto object-fill h-full' />
                </div>
                <h1 className='text-ellipsis line-clamp-2'>{data.productName}</h1>
                <h1 className='text-ellipsis line-clamp-2 text-green'>{data.category}</h1>

                <div>
                    <p className='font-semibold'>
                        {displayCOPCurrency(data.sellingPrice)}
                    </p>

                    <div className="flex space-x-2">
                        <div 
                            className='w-fit p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer' 
                            onClick={() => setEditProduct(true)}
                        >
                            <MdModeEditOutline />
                        </div>
                        <div 
                            className='w-fit p-2 bg-green-100 hover:bg-red-600 rounded-full hover:text-white cursor-pointer' 
                            onClick={deleteProduct}
                        >
                            <MdDelete />
                        </div>
                    </div>
                </div>
            </div>

            {editProduct && (
                <AdminEditProduct 
                    productData={data} 
                    onClose={() => setEditProduct(false)} 
                    fetchdata={fetchdata} 
                />
            )}
        </div>
    );
}

export default AdminProductCard;



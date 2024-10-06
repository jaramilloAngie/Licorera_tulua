import React from 'react';
import { MdDelete } from "react-icons/md";

const AdminBannerCard = ({ data, onDelete }) => {
  const handleDelete = () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este banner?')) {
      onDelete(data._id); // Llamar a la función para eliminar el banner
    }
  };

  return (
    <div className="banner-card border rounded-lg shadow-lg p-2 mb-4 bg-white transition-transform transform hover:scale-105 w-48 h-32"> {/* Tamaño fijo */}
      <img 
        src={data.url} 
        alt={data.title} 
        className="w-full h-24 object-cover rounded-lg mb-2 shadow-sm" 
      />
      <h3 className="text-sm font-semibold text-gray-800 truncate">{data.title}</h3> {/* Texto más pequeño */}
      <button 
  onClick={handleDelete} 
  className="flex items-center justify-center bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition duration-200 w-8 h-8" // Cambiado a w-8 h-8 para un botón más pequeño y redondo
>
  <MdDelete className="text-base" /> {/* Puedes ajustar el tamaño del icono aquí si es necesario */}
</button>

    </div>
  );
};

export default AdminBannerCard;

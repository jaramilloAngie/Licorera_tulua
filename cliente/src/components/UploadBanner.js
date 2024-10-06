import React, { useState } from 'react';
import { CgClose } from "react-icons/cg";
import uploadImage from '../helpers/uploadImage';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const UploadBanner = ({ onClose, fetchData }) => {
  const [bannerImage, setBannerImage] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUploadBanner = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setLoading(true);
      const uploadedImage = await uploadImage(file);
      setBannerImage([uploadedImage.url]); // Almacena la URL del banner subido
      setError(null);
    } catch (err) {
      setError('Error al subir la imagen');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!bannerImage.length) {
      setError('Por favor, cargue la imagen del banner.');
      return;
    }

    try {
      const response = await fetch(SummaryApi.uploadBanner.url, {
        method: SummaryApi.uploadBanner.method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Incluye el token si es necesario
        },
        body: JSON.stringify({ url: bannerImage[0] }), // Envía la URL del banner en el cuerpo
      });

      const responseData = await response.json();
      if (responseData.success) {
        toast.success(responseData?.message);
        fetchData(); // Volver a obtener los banners
        onClose(); // Cerrar el modal
      } else {
        toast.error(responseData?.message);
      }
    } catch (err) {
      setError('Error al subir el banner');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Subir Banner</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
            <CgClose size={24} />
          </button>
        </div>

        {error && <p className="text-green">{error}</p>}
        <form onSubmit={handleSubmit} className="grid gap-4">
          <label htmlFor='bannerImage'>Imagen del banner:</label>
          <label htmlFor='uploadBannerInput'>
            <div className='p-4 border-2 border-dashed border-gray-300 rounded h-32 flex justify-center items-center cursor-pointer hover:bg-gray-100 transition'>
              <div className='text-gray-500 flex flex-col items-center gap-2'>
                <span className='text-4xl'>📤</span>
                <p className='text-sm'>Subir imagen del banner</p>
                <input 
                  type='file' 
                  id='uploadBannerInput' 
                  className='hidden' 
                  onChange={handleUploadBanner} 
                  accept="image/*" 
                />
              </div>
            </div>
          </label>

          {bannerImage[0] && (
            <div className='mt-3'>
              <img src={bannerImage[0]} alt="Banner" className='h-32 object-cover rounded-lg shadow-sm' />
            </div>
          )}

          <div className='flex justify-between mt-4'>
            <button 
              type="submit" 
              className='px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-200' 
              disabled={loading}
            >
              {loading ? 'Subiendo...' : 'Subir Banner'}
            </button>
            <button 
              type="button" 
              className='px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100 transition' 
              onClick={onClose}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadBanner;


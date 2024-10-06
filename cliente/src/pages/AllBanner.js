import React, { useEffect, useState } from 'react';
import UploadBanner from '../components/UploadBanner';
import SummaryApi from '../common';
import AdminBannerCard from '../components/AdminBannerCard';

const AllBanners = () => {
  const [openUploadBanner, setOpenUploadBanner] = useState(false);
  const [allBanners, setAllBanners] = useState([]);

  const fetchAllBanners = async () => {
    try {
      const response = await fetch(SummaryApi.allBanner.url, {
        method: SummaryApi.allBanner.method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Incluye el token si es necesario
        },
      });

      if (!response.ok) throw new Error('Error al cargar los banners');

      const dataResponse = await response.json();
      console.log("banner data", dataResponse);

      setAllBanners(dataResponse.data || []); 
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllBanners();
  }, []);

  const handleDeleteBanner = async (id) => {
    try {
      const response = await fetch(SummaryApi.deleteBanner.url, {
        method: SummaryApi.deleteBanner.method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Incluye el token si es necesario
        },
        body: JSON.stringify({ id }), // Envía el ID del banner en el cuerpo
      });

      if (!response.ok) throw new Error('Error al eliminar el banner');

      await fetchAllBanners(); // Volver a obtener los datos
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <div className='bg-white py-2 px-4 flex justify-between items-center'>
        <h2 className='font-bold text-lg text-green-600'>Todos los Banners</h2>
        <button 
          className='border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition-all py-1 px-3 rounded-full' 
          onClick={() => setOpenUploadBanner(true)}
        >
          Subir Banner
        </button>
      </div>

      {/** Listado de banners */}
      <div className='flex items-center flex-wrap gap-3 py-4 h-full overflow-y-scroll'>
        {
          allBanners.map((banner) => (
            <AdminBannerCard key={banner._id} data={banner} onDelete={handleDeleteBanner} />
          ))
        }
      </div>

      {/** Componente de subir banner */}
      {
        openUploadBanner && (
          <UploadBanner onClose={() => setOpenUploadBanner(false)} fetchData={fetchAllBanners} />
        )
      }
    </div>
  );
};

export default AllBanners;

import React, { useEffect, useState } from 'react';
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import SummaryApi from '../common'; // Asegúrate de que el path a SummaryApi sea correcto.

const BannerProduct = () => {
    const [currentImage, setCurrentImage] = useState(0);
    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(true); // Estado de carga

    const fetchBanners = async () => {
        try {
            const response = await fetch(SummaryApi.allBanner.url, {
                method: SummaryApi.allBanner.method,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (!response.ok) {
                throw new Error('Error al cargar los banners');
            }
    
            const dataResponse = await response.json();
            setBanners(dataResponse.data || []);
            setLoading(false);
        } catch (error) {
            console.error('Error al cargar banners:', error);
            setLoading(false);
        }
    };
    

    const nextImage = () => {
        if (banners.length === 0) return; // Evitar si no hay banners
        setCurrentImage(prev => (prev + 1) % banners.length);
    };

    const prevImage = () => {
        if (banners.length === 0) return; // Evitar si no hay banners
        setCurrentImage(prev => (prev - 1 + banners.length) % banners.length);
    };

    useEffect(() => {
        fetchBanners();
        const interval = setInterval(() => {
            if (banners.length > 0) { // Solo ejecuta si hay banners
                nextImage();
            }
        }, 5000);
        return () => clearInterval(interval);
    }, [banners.length]); // Dependencia en el número de banners

    if (loading) {
        return <div>Loading...</div>; // Mostrar un indicador de carga
    }

    return (
        <div className='container mx-auto px-4 rounded'>
            <div className='h-56 md:h-72 w-full bg-slate-200 relative'>
                <div className='absolute z-10 h-full w-full md:flex items-center hidden'>
                    <div className='flex justify-between w-full text-2xl'>
                        <button onClick={prevImage} className='bg-white shadow-md rounded-full p-1'>
                            <FaAngleLeft />
                        </button>
                        <button onClick={nextImage} className='bg-white shadow-md rounded-full p-1'>
                            <FaAngleRight />
                        </button>
                    </div>
                </div>

                <div className='flex h-full w-full overflow-hidden'>
                    {banners.map((banner, index) => (
                        <div 
                            className='w-full h-full min-w-full min-h-full transition-all' 
                            key={banner._id} 
                            style={{ transform: `translateX(-${currentImage * 100}%)` }}
                        >
                            <img 
                                src={banner.url} 
                                alt={banner.title} 
                                className='w-full h-full object-cover' 
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default BannerProduct;

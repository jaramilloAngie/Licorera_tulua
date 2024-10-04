import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import { Link } from 'react-router-dom';

const CategoryList = () => {
    const [categoryProduct, setCategoryProduct] = useState([]);
    const [loading, setLoading] = useState(false);
    const categoryLoading = new Array(6).fill(null);

    const fetchCategoryProduct = async () => {
        setLoading(true);
        const response = await fetch(SummaryApi.categoryProduct.url);
        const dataResponse = await response.json();
        setLoading(false);

        // Ordenar "Promociones" al final y "Vinos" antes de "Promociones"
        const reorderedCategories = dataResponse.data.filter(product => product.category !== 'promociones');
        const promocionesCategory = dataResponse.data.find(product => product.category === 'promociones');

        // Si existen, añadir "Vinos" y "Promociones" al final
        if (promocionesCategory) reorderedCategories.push(promocionesCategory);

        setCategoryProduct(reorderedCategories);
    };
    
    useEffect(() => {
        fetchCategoryProduct();
    }, []);

    return (
        <div className='bg-slate-300'>
            <div className='container mx-auto p-3'>
                <div className='flex items-center gap-3 justify-between overflow-scroll scrollbar-none'>
                    {
                        loading ? (
                            categoryLoading.map((el, index) => {
                                return (
                                    <div key={index}>
                                        <Link to={"/"}>
                                            <p className='capitalize text-lg text-white font-bold'>Licorera Tulua</p>
                                        </Link>
                                        <div className='w-full h-full bg-slate-300'></div>
                                    </div>
                                );
                            })  
                        ) : (
                            <div className="hidden md:flex space-x-16"> {/* Oculta en pantallas pequeñas y muestra en medianas y grandes */}
                                <Link to={"/"}>
                                    <p className='capitalize text-lg text-green font-bold'>Inicio</p>
                                </Link>
                                {/* Mapeamos sobre 'categoryProduct' */}
                                {categoryProduct.map((product, index) => (
                                    <Link to={`/product-category?category=${product.category}`} className='cursor-pointer' key={index}>
                                        <p className='capitalize text-lg text-green font-bold'>{product.category}</p>
                                    </Link>
                                ))}
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default CategoryList;

import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SummaryApi from '../common';
import { FaStar } from 'react-icons/fa';
import { FaStarHalf } from 'react-icons/fa';
import CategroyWiseProductDisplay from '../components/CategoryWiseProductDisplay';
import addToCart from '../helpers/addToCart';
import Context from '../context';
import displayCOPCurrency from '../helpers/displayCurrency';
import Coupon from '../components/Coupon';

const ProductDetails = () => {
  const [data, setData] = useState({
    productName: '',
    brandName: '',
    category: '',
    productImage: [],
    description: '',
    price: '',
    sellingPrice: '',
  });
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const productImageListLoading = new Array(4).fill(null);
  const [activeImage, setActiveImage] = useState('');

  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0,
  });
  const [zoomImage, setZoomImage] = useState(false);

  const { fetchUserAddToCart } = useContext(Context);

  const navigate = useNavigate();

  const fetchProductDetails = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.productDetails.url, {
      method: SummaryApi.productDetails.method,
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        productId: params?.id,
      }),
    });
    setLoading(false);
    const dataReponse = await response.json();

    setData(dataReponse?.data);
    setActiveImage(dataReponse?.data?.productImage[0]);
  };

  useEffect(() => {
    fetchProductDetails();
  }, [params]);

  const handleMouseEnterProduct = (imageURL) => {
    setActiveImage(imageURL);
  };

  const handleZoomImage = useCallback(
    (e) => {
      setZoomImage(true);
      const { left, top, width, height } = e.target.getBoundingClientRect();

      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;

      setZoomImageCoordinate({
        x,
        y,
      });
    },
    [zoomImageCoordinate]
  );

  const handleLeaveImageZoom = () => {
    setZoomImage(false);
  };

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  const handleBuyProduct = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
    navigate('/cart');
  };

  // Nueva lógica para cupones
  const coupons = [
    {
      couponCode: 'LICOR10',
      discount: 10,
      description: 'Obtén un 10% de descuento en este producto.',
    },
    {
      couponCode: 'ENVIOGRATIS',
      discount: 100,
      description: 'Envío gratis para pedidos superiores a $50.000.',
    },
  ];

  const handleApplyCoupon = (couponCode) => {
    console.log(`Cupón ${couponCode} aplicado.`);
    // Lógica adicional para aplicar el cupón en el carrito o checkout
  };

  return (
    <div className="container mx-auto p-4">
      <div className="min-h-[200px] flex flex-col lg:flex-row gap-4 rounded-md p-2 border-2 border-slate-400">
        {/*** product Image ***/}
        <div className="h-96 flex flex-col lg:flex-row-reverse gap-4 ">
          <div className="h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-2 rounded-md border-2 border-green-600">
            <img
              src={activeImage}
              className="h-full w-full object-scale-down mix-blend-multiply"
              onMouseMove={handleZoomImage}
              onMouseLeave={handleLeaveImageZoom}
            />

            {/** product zoom **/}
            {zoomImage && (
              <div className="hidden lg:block absolute min-w-[500px] overflow-hidden min-h-[400px] bg-slate-200 p-1 -right-[510px] top-0 ">
                <div
                  className="w-full h-full min-h-[400px] min-w-[500px] mix-blend-multiply scale-150 "
                  style={{
                    background: `url(${activeImage})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: `${zoomImageCoordinate.x * 100}% ${
                      zoomImageCoordinate.y * 100
                    }% `,
                  }}
                ></div>
              </div>
            )}
          </div>

          <div className="h-full">
            {loading ? (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full ">
                {productImageListLoading.map((el, index) => {
                  return (
                    <div
                      className="h-20 w-20 bg-slate-200 rounded animate-pulse"
                      key={'loadingImage' + index}
                    ></div>
                  );
                })}
              </div>
            ) : (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {data?.productImage?.map((imgURL, index) => {
                  return (
                    <div
                      className="h-20 w-20 bg-slate-200 p-1 rounded-md border-2 border-green-600"
                      key={imgURL}
                    >
                      <img
                        src={imgURL}
                        className="w-full h-full object-scale-down mix-blend-multiply cursor-pointer"
                        onMouseEnter={() => handleMouseEnterProduct(imgURL)}
                        onClick={() => handleMouseEnterProduct(imgURL)}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/*** product details ***/}
        <div className="flex flex-col gap-1">
          {data?.brandName && (
            <p className="bg-green-200 text-green-600 px-2 rounded-full inline-block w-fit ">
              {data.brandName}
            </p>
          )}
          <h2 className="text-2xl lg:text-4xl font-medium">{data?.productName}</h2>
          <p className="capitalize text-slate-400">{data?.category}</p>

          <div className="text-green-600 flex items-center gap-1">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStarHalf />
          </div>

          <div className="flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1">
            <p className="text-green-600">{displayCOPCurrency(data.sellingPrice)}</p>
            {data?.price !== data?.sellingPrice && (
              <p className="text-slate-500 line-through">{displayCOPCurrency(data?.price)}</p>
            )}
          </div>

          <div className="flex items-center gap-3 my-2">
            <button
              className="border-2 border-green-600 rounded px-3 py-1 min-w-[120px] text-green-600 font-medium hover:bg-green-600 hover:text-white"
              onClick={(e) => handleBuyProduct(e, data?._id)}
            >
              Comprar
            </button>
            <button
              className="border-2 border-green-600 rounded px-3 py-1 min-w-[120px] font-medium text-white bg-green-600 hover:text-green-600 hover:bg-white"
              onClick={(e) => handleAddToCart(e, data?._id)}
            >
              Añadir al carrito
            </button>
          </div>

          <div>
            {data?.description && (
              <p className="text-slate-600 font-medium my-1">Descripción :</p>
            )}
            <p>{data.description}</p>
          </div>
        </div>
      </div>

      {/*** Sección de cupones ***/}
      <section className="coupons-section my-8">
        <h2 className="text-xl font-bold mb-4">Cupones disponibles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {coupons.map((coupon, index) => (
            <Coupon
              key={index}
              couponCode={coupon.couponCode}
              discount={coupon.discount}
              description={coupon.description}
              onApply={() => handleApplyCoupon(coupon.couponCode)}
            />
          ))}
        </div>
      </section>

      {data.category && (
        <CategroyWiseProductDisplay
          category={data?.category}
          heading={'Productos Relacionados'}
        />
      )}
    </div>
  );
};

export default ProductDetails;

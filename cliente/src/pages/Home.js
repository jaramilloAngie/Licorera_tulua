import React from 'react';
import BannerProduct from '../components/BannerProduct';
import HorizontalCardProduct from '../components/HorizontalCardProduct';
import VerticalCardProduct from '../components/VerticalCardProduct';
import Coupon from '../components/Coupon';

const Home = () => {
  const coupons = [
    {
      couponCode: 'VERANO20',
      discount: 20,
      description: 'Obtén un 20% de descuento en todos los productos por temporada navideña.',
    },
    {
      couponCode: 'BEBIDAS10',
      discount: 10,
      description: 'Disfruta un 10% de descuento en bebidas sin alcohol.',
    },
    {
      couponCode: 'TULUA70',
      discount: 30,
      description: 'Obtén un 30% de descuento en tu próxima compra.',
    },
  ];

  return (
    <div>
      <div className="flex-1 container px-4 rounded overflow-y-auto p-3 relative mt-4 mx-auto">
        <BannerProduct />
        <VerticalCardProduct category="promociones" />
        <HorizontalCardProduct category="bebidas sin alcohol" heading="Bebidas sin alcohol" />
        <HorizontalCardProduct category="cervezas" heading="Cervezas" />
        <HorizontalCardProduct category="licores" heading="Licores" />
        <HorizontalCardProduct category="vinos" heading="Vinos" />
        <HorizontalCardProduct category="mini market" heading="Mini Market" />

        {/* Sección de cupones */}
        <section className="coupons-section my-8">
          <h2 className="text-2xl font-bold mb-4">Cupones de descuento</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {coupons.map((coupon, index) => (
              <Coupon
                key={index}
                couponCode={coupon.couponCode}
                discount={coupon.discount}
                description={coupon.description}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;

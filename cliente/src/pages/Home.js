import React from 'react'
import CategoryList from '../components/CategoryList'
import AvisoImage from "../assest/fiesta.jpg";
import { toast } from 'react-toastify';
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  
  return (
    <div>
      
      {/* Banner de productos */}
      <div className='flex-1 container px-4 rounded overflow-y-auto p-3 relative mt-4 mx-auto'> {/* Ocupa el resto del espacio */}
                <BannerProduct/> {/* Componente de banner importado */}
                <VerticalCardProduct category={"promociones"} heading={"Promociones"} />
      <HorizontalCardProduct category={"bebidas sin alcohol"} heading={"Bebidas sin alcohol"} />
      <HorizontalCardProduct category={"cervezas"} heading={"Cervezas"} />
      <HorizontalCardProduct category={"licores"} heading={"Licores"} />
      <HorizontalCardProduct category={"vinos"} heading={"Vinos"} />
      <HorizontalCardProduct category={"mini market"} heading={"Mini Market"} />



            </div>


    </div>
  )
}

export default Home
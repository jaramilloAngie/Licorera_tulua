import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import SummaryApi  from './common';
import Context from './context';
import { useDispatch, useSelector } from 'react-redux';
import { setUserDetails } from './store/userSlice';
import CategoryList from './components/CategoryList';
import AvisoImage from "./assest/fiesta.jpg";

function App() {
  const dispatch = useDispatch()
  const [cartProductCount,setCartProductCount] = useState(0)
  const user = useSelector(state => state?.user?.user)
  const [showBanner, setShowBanner] = useState(true);

  const fetchUserDetails = async()=>{
    const dataResponse = await fetch(SummaryApi.current_user.url,{
      method: SummaryApi.current_user.method,
      credentials: 'include'
    })

    const dataApi = await dataResponse.json()

    if(dataApi.success){
      dispatch(setUserDetails(dataApi.data))
    }

    console.log(dataResponse)
  }

  const fetchUserAddToCart = async()=>{
    const dataResponse = await fetch(SummaryApi.addToCartProductCount.url,{
      method : SummaryApi.addToCartProductCount.method,
      credentials : 'include'
    })

    const dataApi = await dataResponse.json()

    setCartProductCount(dataApi?.data?.count)
  }

  const mayorEdad = () => {
    setShowBanner(false);
  };

  const menorEdad = () => {
    // Implementar lógica para menores de edad si es necesario
    toast.error('Acceso denegado para menores de edad');
  };



useEffect(()=>{
  /**user Details */
  fetchUserDetails()
  /**user Details cart product */
  fetchUserAddToCart()

},[])



  return (
    <>
    
    <div className={showBanner ? 'no-interaction' : ''}>
    {/* El resto de tu contenido de la página aquí */}
</div>

<div>
    {
        !user?._id && showBanner && (
            <>
                <div className="overlay"></div> {/* Fondo oscuro */}
                <div id="floatingWindow" className="floating-window">
                    <h2 className='font-bold text-[36px]'>Bienvenido</h2>
                    <div className="image-container">
                        <img src={AvisoImage} alt="Aviso" />
                    </div>
                    <p className="message-top">Para ingresar a este sitio web debes ser mayor de edad</p>
                    <div> 
                        <button id="button1" className="button1" onClick={() => mayorEdad()}>Soy mayor de 18</button>
                        <button id="button2" className="button2" onClick={() => menorEdad()}>Soy menor de 18</button>
                    </div>
                    <p className="message-top">El exceso de alcohol es perjudicial para la salud. Prohíbase el expendio de alcohol a menores de edad.</p>
                </div>
            </>
        )
    }
</div>

    
    <Context.Provider value={{
          fetchUserDetails, // user detail fetch 
          cartProductCount, // current user add to cart product count,
          fetchUserAddToCart
    }}>
    <ToastContainer className="rounded-full" position="top-right"/>
    <Header className=" absolute "/>
    <CategoryList className="absolute" />   
    <main className='min-h-screen relative'>
    <Outlet/>
    </main>
    </Context.Provider>
    </>

  );
}

export default App;

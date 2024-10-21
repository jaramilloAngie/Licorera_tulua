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


//Importar del chat
import ChatBot from 'react-simple-chatbot';
import { FaWhatsapp } from 'react-icons/fa'; // Importa el icono de WhatsApp desde react-icons

function App() {
  const [showChatBot, setShowChatBot] = useState(false);

  const steps = [
    {
      id: '1',
      message: '¡Hola! ¿En qué puedo ayudarte hoy?',
      trigger: '2',
    },
    {
      id: '2',
      options: [
        { value: 'facturacion', label: 'Facturación', trigger: 'facturacion' },
        { value: 'pedidos', label: 'Pedidos', trigger: 'pedidos' },
        { value: 'recomendaciones', label: 'Recomendaciones', trigger: 'recomendaciones' },
        { value: 'promocion', label: 'Promoción', trigger: 'promocion' },
      ],
    },
    {
      id: 'facturacion',
      message: 'Para la facturación, por favor ingresa a tu cuenta y accede a la sección de Facturación en el menú principal.',
      end: true,
    },
    {
      id: 'pedidos',
      message: 'Puedes revisar tus pedidos recientes en la sección de Pedidos en el menú principal.',
      end: true,
    },
    {
      id: 'recomendaciones',
      message: 'Basado en tus compras anteriores, te recomendamos nuestros licores premium. ¿Te gustaría ver una lista?',
      end: true,
    },
    {
      id: 'promocion',
      message: 'Tenemos promociones especiales este mes. ¡No te las pierdas en la sección de Promociones!',
      end: true,
    }
  ];

  const dispatch = useDispatch();
  const [cartProductCount,setCartProductCount] = useState(0);
  const user = useSelector(state => state?.user?.user);
  const [showBanner, setShowBanner] = useState(true);

  const fetchUserDetails = async() => {
    const dataResponse = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: 'include'
    });

    const dataApi = await dataResponse.json();

    if(dataApi.success){
      dispatch(setUserDetails(dataApi.data));
    }
  };

  const fetchUserAddToCart = async() => {
    const dataResponse = await fetch(SummaryApi.addToCartProductCount.url, {
      method : SummaryApi.addToCartProductCount.method,
      credentials : 'include'
    });

    const dataApi = await dataResponse.json();

    setCartProductCount(dataApi?.data?.count);
  };

  const mayorEdad = () => {
    setShowBanner(false);
  };

  const menorEdad = () => {
    toast.error('Acceso denegado para menores de edad');
  };

  useEffect(() => {
    fetchUserDetails();
    fetchUserAddToCart();
  }, []);

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
                  <button id="button1" className="button1" onClick={mayorEdad}>Soy mayor de 18</button>
                  <button id="button2" className="button2" onClick={menorEdad}>Soy menor de 18</button>
                </div>
                <p className="message-top">El exceso de alcohol es perjudicial para la salud. Prohíbase el expendio de alcohol a menores de edad.</p>
              </div>
            </>
          )
        }
      </div>

      <div className="App">
        {/* Resto de tu contenido */}
        <div className="floating-button-container">
          {/* Icono de WhatsApp */}
          <a
            href="https://wa.me/573167809782" 
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-icon"
          >
            <FaWhatsapp size={45} color="white"/>
          </a>

          {/* Botón de Chatbot */}
          <button className="floating-button chat-bot-button" onClick={() => setShowChatBot(!showChatBot)}>
            💬
          </button>

          {/* Chatbot */}
          {showChatBot && (
            <div className="chat-bot">
              <ChatBot steps={steps} />
            </div>
          )}
        </div>
      </div>

      <Context.Provider value={{
        fetchUserDetails, 
        cartProductCount, 
        fetchUserAddToCart
      }}>
        <ToastContainer className="rounded-full" position="top-right"/>
        <Header className="absolute"/>
        <CategoryList className="absolute"/>   
        <main className='min-h-screen relative'>
          <Outlet/>
        </main>
      </Context.Provider>
    </>
  );
}

export default App;

import React, { useContext, useState } from 'react'
import { GrSearch } from "react-icons/gr";
import { FaUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice"
import ROLE from '../common/role';
import Context from '../context';


const Header = () => {

    const user = useSelector(state => state?.user?.user)
    const dispatch = useDispatch()
    const [menuDisplay, setMenuDisplay] = useState(false)
    const context = useContext(Context)
  const navigate = useNavigate()
  const searchInput = useLocation()
  const URLSearch = new URLSearchParams(searchInput?.search)
  const searchQuery = URLSearch.getAll("q")
  const [search,setSearch] = useState(searchQuery)



    console.log(user)

    const handleLogout = async () => {
        const fetchData = await fetch(SummaryApi.logout_user.url,{
            method : SummaryApi.logout_user.method,
            credentials : 'include'
        })


        const data = await fetchData.json()

        if(data.success){
            toast.success(data.message)
            dispatch(setUserDetails(null))
        }

        if(data.error){
            toast.error(data.message)
        }

    }

    const handleSearch = (e)=>{
        const { value } = e.target
        setSearch(value)
    
        if(value){
          navigate(`/search?q=${value}`)
        }else{
          navigate("/search")
        }
        }


  return (

    
    <header className='h-16 shadow-md bg-green'> 
    
    
    
        <div className='h-full container mx-auto flex items-center px-4 justify-between rounded-full'>
            <div className=''>
                <Link to={"/"}>
                <p className='capitalize text-lg text-white font-bold'>Licorera Tulua</p>
                </Link>
            </div>

            <div className='hidden lg:flex bg-slate-100 items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2'> 
                <input type='text' 
                placeholder='  Buscar productos' 
                className='w-full outline-none rounded-full' 
                onChange={handleSearch} value={search}/>
                <div className='text-lg min-w-[50px] h-8 bg-gray-200 flex items-center justify-center rounded-r-full text-black'>
                    <GrSearch/>
                </div>
            </div>

                        

            <div className='flex items-center gap-7'>

                <div className='relative flex justify-center items-center align-middle' >
                    {
                        user?._id && (
                            <div className='text-3xl cursor-pointer text-white items-center' onClick={()=>setMenuDisplay(preve => !preve )}>
                    {
                        
                    
                        user?.profilepic ?(
                            
                            <img src={user?.profilepic} className='w-10 h-10 rounded-full bg-white' alt={user?.name}></img>
                            
                        ):(
                            <FaUserCircle />
                            
                        )

                        
                    }
                    
                </div>
                        )
                    }
                

                {
                    menuDisplay && (
                        <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded z-50'>
                            <div className='text-lg flex items-center text-center'>
            <span className="whitespace-nowrap hidden md:block p-2">{user?.name || ''}</span>
                </div>
                    
                    <nav>
                        {
                            user?.role === ROLE.Administrador &&(

                                <Link to={"admin-panel"} className='whitespace-nowrap hover:bg-slate-200 rounded-full p-2' >Administrador</Link>

                            )
                        }
                        <Link to={'/order'} className='whitespace-nowrap hidden md:block hover:bg-slate-200 rounded-full p-2' onClick={()=>setMenuDisplay(preve => !preve)}>Perfil</Link>                        
                        </nav>
                </div>

                    )
                }
                
                </div>

                {
                     user?._id && (
                      <Link to={"/cart"} className='text-2xl relative text-white'>
                          <span><FaShoppingCart/></span>
      
                          <div className='bg-white text-green w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-4'>
                              <p className='text-sm'>{context?.cartProductCount}</p>
                          </div>
                      </Link>
                      )
                  }


                <div>
                    {
                        user?._id ? (
                            <button onClick={handleLogout} className='bg-slate-50 text-green px-3 py-1 rounded-full hover:bg-slate-200'>Cerrar</button>
                        ):
                        (
                            <Link to={"/login"} className='bg-slate-50 text-green px-3 py-1 rounded-full hover:bg-slate-200'>Iniciar sesión</Link>

                        )
                    }
                                    </div>

            </div>
        </div>
    </header>
  )
}

export default Header
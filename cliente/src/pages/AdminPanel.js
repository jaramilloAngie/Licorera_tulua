import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { FaUserCircle } from "react-icons/fa";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ROLE from '../common/role';


const AdminPanel = () => {
    const user = useSelector(state => state?.user?.user)
    const navigate = useNavigate()
    
    useEffect(()=>{

        if(user?.role !== ROLE.Administrador){
            navigate('/')
        }
    },[user])


    

  return (
    <div className='min-h-[calc(150vh)] md:flex hidden'>

        <aside className='bg-green min-h-full  w-full  max-w-60 pt-10'>
                <div className='h-32  flex justify-center items-center flex-col'>
                    <div className='text-5xl cursor-pointer relative flex justify-center'>
                        {
                        user?.profilepic ? (
                            
                            <img src={user?.profilepic} className='w-20 h-20 rounded-full bg-white' alt={user?.name}></img>
                        ) : (
                            <FaUserCircle />
                        )
                        }
                    </div>
                    <p className='capitalize text-lg text-white font-bold'>{user?.name}</p>
                    <p className='text-white font-bold '>{user?.role}</p>
                </div>

                 {/***navigation */}       
                <div>   
                    <nav className='grid p-4'>
                        <Link to={"all-users"} className='block px-4 py-2 rounded-lg text-white font-bold : hover:bg-green-600'>Todos los usuarios</Link>
                        <Link to={"all-products"} className='block px-4 py-2 rounded-lg text-white font-bold : hover:bg-green-600'>Todos los productos</Link>
                        <Link to={"all-banners"} className='block px-4 py-2 rounded-lg text-white font-bold : hover:bg-green-600'>Todas los anuncios</Link>
                        <Link to={"all-orders"} className='block px-4 py-2 rounded-lg text-white font-bold : hover:bg-green-600'>Todas las ordenes</Link>
                    </nav>
                </div>  
        </aside>

        <main className='w-full h-full p-2'>
            <Outlet/>
        </main>
    </div>
  )
}

export default AdminPanel
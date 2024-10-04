import React from 'react'
import myFooter from '../assest/LT.png'

const Footer = () => {
  return (
    <footer className='bg-green-500'>
      <div className='container mx-auto p-4'>
       <img src={myFooter} alt='footer' className='w-20 h-20 rounded-full mx-auto '></img>
      </div>
      
    </footer>
  )
}

export default Footer
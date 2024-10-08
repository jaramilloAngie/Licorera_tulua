import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { IoEyeSharp, IoEyeOff } from "react-icons/io5";
import { useLocation, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    verificationCode: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const emailFromUrl = queryParams.get('email');
    if (emailFromUrl) {
      setFormData((prevData) => ({ ...prevData, email: emailFromUrl }));
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que las contraseñas coincidan
    if (formData.newPassword !== formData.confirmNewPassword) {
      toast.error('Las contraseñas no coinciden');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(SummaryApi.resetPassword.url, {
        method: SummaryApi.resetPassword.method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        toast.success('Contraseña restablecida exitosamente');
        navigate('/login');
      } else {
        toast.error(data.message || 'Error al restablecer la contraseña');
      }
    } catch (error) {
      console.error('Error al restablecer la contraseña:', error);
      toast.error('Error al restablecer la contraseña.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto container p-4">
      <div className="bg-white p-2 py-5 w-full max-w-md mx-auto rounded-md border-2 border-green-600">
        <h2 className="text-3xl text-center font-bold text-green-600 mb-6">Cambiar contraseña</h2>
        <form className='pt-6' onSubmit={handleSubmit}>
          <div className='grid mb-4'>
            <label>Correo electrónico:</label>
            <div className='bg-slate-100 p-2'>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                readOnly
                className='w-full h-full outline-none bg-transparent'
              />
            </div>
          </div>

          <div className='grid mb-4'>
            <label>Código de Verificación:</label>
            <div className='bg-slate-100 p-2'>
              <input
                type="text"
                name="verificationCode"
                value={formData.verificationCode}
                onChange={handleChange}
                required
                className='w-full h-full outline-none bg-transparent'
              />
            </div>
          </div>

          <div className='grid mb-4'>
            <label>Nueva Contraseña:</label>
            <div className='bg-slate-100 p-2 flex'>
              <input
                type={showPassword ? "text" : "password"}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                required
                className='w-full h-full outline-none bg-transparent'
              />
              <div className='cursor-pointer text-green-600' onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <IoEyeSharp /> : <IoEyeOff />}
              </div>
            </div>
          </div>

          <div className='grid mb-4'>
            <label>Confirmar Nueva Contraseña:</label>
            <div className='bg-slate-100 p-2 flex'>
              <input
                type={showPassword ? "text" : "password"}
                name="confirmNewPassword"
                value={formData.confirmNewPassword}
                onChange={handleChange}
                required
                className='w-full h-full outline-none bg-transparent'
              />
              <div className='cursor-pointer text-green-600' onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <IoEyeSharp /> : <IoEyeOff />}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className='bg-green-600 text-white px-6 py-2 rounded-full hover:scale-110 transition-all mx-auto block mt-6'              
            disabled={loading}
          >
            {loading ? 'Restableciendo...' : 'Restablecer Contraseña'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;

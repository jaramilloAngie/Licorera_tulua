import React, { useState } from 'react';
import loginIcons from '../assest/signin.gif';
import { IoEyeSharp, IoEyeOff } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import imageTobase64 from '../helpers/imageTobase64';
import SummaryApi from "../common";
import { toast } from 'react-toastify';
import axios from 'axios';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
    profilepic: '',
    age: '',
    phone: '',
    verificationCode: '',
  });

  const [isCodeSent, setIsCodeSent] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const imagePic = await imageTobase64(file);
      setData((prev) => ({
        ...prev,
        profilepic: imagePic,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar si todos los campos están llenos
    if (!data.name || !data.email || !data.password || !data.age || !data.phone || (isCodeSent && !data.verificationCode)) {
      toast.error("Por favor, complete todos los campos requeridos");
      return;
    }

    // Validar el formato del correo electrónico
    if (!data.email.includes('@')) {
      toast.error("Por favor, introduce un correo electrónico válido.");
      return;
    }

    if (isCodeSent) {
      // Verificar el código de verificación
      try {
        const response = await fetch(SummaryApi.verifyCode.url, {
          method: SummaryApi.verifyCode.method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: data.email, verificationCode: data.verificationCode , name: data.name, phone: data.phone, age: data.age, password: data.password }),
        });

        const result = await response.json();

        if (response.ok) {
          const { password, name, profilepic, phone, age } = data;
          const newUserData = { name, email: data.email, password, profilepic, phone, age };

          // Registrar el nuevo usuario
          const dataResponse = await fetch(SummaryApi.signUP.url, {
            method: SummaryApi.signUP.method,
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newUserData),
          });

          const dataApi = await dataResponse.json();
          if (dataApi.success) {
            toast.success(dataApi.message);
            navigate('/login');
          } else {
            toast.error(dataApi.message);
          }
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        console.error("Error verificando el código:", error);
        toast.error("Error al verificar el código" );
      }
    } else {
      const age = parseInt(data.age, 10);
      if (age < 18) {
        toast.error("Debes tener al menos 18 años para registrarte");
        return;
      }

      try {
        // Validar si el correo es temporal o desechable
        const emailValidationResponse = await axios.get(`https://open.kickbox.com/v1/disposable/${data.email}`);
        const emailValidationResult = emailValidationResponse.data;

        if (emailValidationResult.disposable) {
          toast.error("El correo es temporal o desechable. Por favor usa un correo válido.");
          return;
        }

        // Enviar el código de verificación
        const codeResponse = await fetch(SummaryApi.sendVerificationCode.url, {
          method: SummaryApi.sendVerificationCode.method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: data.email, name: data.name, phone: data.phone, age: data.age, password: data.password }),
        });

        const codeApi = await codeResponse.json();

        if (codeApi.success) {
          toast.success("Código de verificación enviado a tu correo.");
          setIsCodeSent(true);
        } else {
          toast.error(codeApi.message);
        }
      } catch (error) {
        console.error("Error enviando el código:", error);
        toast.error("Error al enviar el código de verificación");
      }
    }
  };

  return (
    <section id='sign-up'>
      <div className='mx-auto container p-4'>
        <div className='bg-white p-2 py-5 w-full max-w-md mx-auto rounded-md border-2 border-green-600'>
          <div className='w-20 h-20 mx-auto rounded-full'>
            <div className='overflow-hidden w-20 h-20'>
              <img src={data.profilepic || loginIcons} alt='login icons' className='rounded-full w-full h-full object-cover'></img>
            </div>
            <form>
              <label>
                <div className='text-xs bg-slate-200 text-center p-1 rounded-full mt-2 cursor-pointer'>
                  Subir foto
                </div>
                <input type='file' className='hidden' onChange={handleUploadPic} name='profilepic'></input>
              </label>
            </form>
          </div>

          <form className='pt-12' onSubmit={handleSubmit}>
            <div className='grid'>
              <label>Nombre :</label>
              <div className='bg-slate-100 p-2'>
                <input
                  type='text'
                  placeholder='Escribe tu nombre'
                  name='name'
                  value={data.name}
                  onChange={handleChange}
                  required
                  className='w-full h-full outline-none bg-transparent'>
                </input>
              </div>
            </div>

            <div className='grid'>
              <label>Correo :</label>
              <div className='bg-slate-100 p-2'>
                <input
                  type='email'
                  placeholder='Escribe tu correo'
                  name='email'
                  value={data.email}
                  onChange={handleChange}
                  required
                  className='w-full h-full outline-none bg-transparent'>
                </input>
              </div>
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label>Teléfono :</label>
                <div className='bg-slate-100 p-2'>
                  <input
                    type='tel'
                    placeholder='Escribe tu teléfono'
                    name='phone'
                    value={data.phone}
                    onChange={handleChange}
                    required
                    className='w-full h-full outline-none bg-transparent'>
                  </input>
                </div>
              </div>

              <div>
                <label>Edad :</label>
                <div className='bg-slate-100 p-2'>
                  <input
                    type='number'
                    placeholder='Escribe tu edad'
                    name='age'
                    value={data.age}
                    onChange={handleChange}
                    required
                    className='w-full h-full outline-none bg-transparent'>
                  </input>
                </div>
              </div>
            </div>

            <div>
              <label>Contraseña :</label>
              <div className='bg-slate-100 p-2 flex'>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder='Escribe tu contraseña'
                  value={data.password}
                  name='password'
                  onChange={handleChange}
                  required
                  className='w-full h-full outline-none bg-transparent'>
                </input>
                <div className='cursor-pointer text-green-600'>
                  <span>
                    {showPassword ? (
                      <IoEyeSharp onClick={() => setShowPassword(false)} />
                    ) : (
                      <IoEyeOff onClick={() => setShowPassword(true)} />
                    )}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <label>Confirmar Contraseña :</label>
              <div className='bg-slate-100 p-2 flex'>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder='Confirma tu contraseña'
                  value={data.confirmPassword}
                  name='confirmPassword'
                  onChange={handleChange}
                  required
                  className='w-full h-full outline-none bg-transparent'>
                </input>
                <div className='cursor-pointer text-green-600'>
                  <span>
                    {showConfirmPassword ? (
                      <IoEyeSharp onClick={() => setShowConfirmPassword(false)} />
                    ) : (
                      <IoEyeOff onClick={() => setShowConfirmPassword(true)} />
                    )}
                  </span>
                </div>
              </div>
            </div>

            {isCodeSent && (
              <div>
                <label>Código de Verificación :</label>
                <div className='bg-slate-100 p-2'>
                  <input
                    type='text'
                    placeholder='Introduce el código'
                    name='verificationCode'
                    value={data.verificationCode}
                    onChange={handleChange}
                    required
                    className='w-full h-full outline-none bg-transparent'>
                  </input>
                </div>
              </div>
            )}

            <div className='flex justify-between mt-4'>
              <p>¿Ya tienes cuenta? <Link to='/login' className='text-green-500'>Iniciar sesión</Link></p>
              <button type='submit' className='bg-green-600 text-white px-4 py-2 rounded'>
                {isCodeSent ? 'Verificar Código' : 'Enviar Código'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUp;

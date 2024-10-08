import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import SummaryApi from "../common";

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Inicializa useNavigate

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(SummaryApi.forgotPassword.url, {
        method: SummaryApi.forgotPassword.method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Revisa tu correo para restablecer la contraseña');
        navigate(`/reset-password?email=${email}`); // Redirige a la página de restablecer contraseña
      } else {
        toast.error(data.message || 'Error al enviar el correo');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Hubo un problema al enviar el correo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="forgot-password">
      <div className="mx-auto container p-4">
        <div className="bg-white p-2 py-5 w-full max-w-md mx-auto rounded-md border-2 border-green-600">
          <h2 className="text-3xl text-center font-bold text-green-600 mb-6">Restablecer contraseña</h2>
          <form className="pt-6" onSubmit={handleSubmit}>
            <div className="grid">
              <label>Correo:</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="email"
                  placeholder="Escribe tu correo"
                  value={email}
                  onChange={handleChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>
            <button
              className="bg-green-600 text-white px-6 py-2 w-full max-w-[200px] rounded-full hover:scale-110 transition-all mx-auto block mt-6"
              disabled={loading}
            >
              {loading ? 'Enviando...' : 'Enviar correo'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;


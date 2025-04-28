import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Welcome() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Verificar si el usuario está autenticado
    const userData = sessionStorage.getItem('user');
    
    if (!userData) {
      // Si no hay datos de usuario, redirigir al login
      router.replace('/');
      return;
    }
    
    // Establecer los datos del usuario
    setUser(JSON.parse(userData));
  }, [router]);

  const handleLogout = () => {
    // Eliminar datos de la sesión
    sessionStorage.removeItem('user');
    // Redirigir al login
    router.replace('/');
  };

  // Mostrar pantalla de carga mientras verificamos autenticación
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <div className="text-center">
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <Head>
        <title>NovaLearn - Bienvenida</title>
      </Head>
      
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mt-16">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600">NovaLearn</h1>
          <p className="text-gray-600 mt-2">Biblioteca Virtual</p>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-medium text-gray-800">
            ¡Bienvenido, {user.fullName}!
          </h2>
          <p className="text-gray-600 mt-4">Disfruta de tu lectura.</p>
          
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <p className="text-gray-700 font-medium">Tu libro favorito es:</p>
            <p className="text-blue-700 font-bold mt-2">"{user.favoriteBook}"</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-300"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}
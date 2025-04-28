import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Welcome() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const userData = sessionStorage.getItem('user');
    
    if (!userData) {
      router.replace('/');
      return;
    }
    
    setUser(JSON.parse(userData));
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    router.replace('/');
  };

  if (!user) {
    return (
      <div>
        <div>
          <p>Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>NovaLearn - Bienvenida</title>
      </Head>
      
      <div>
        <div>
          <h1>NovaLearn</h1>
          <p>Biblioteca Virtual</p>
        </div>

        <div>
          <h2>
            ¡Bienvenido, {user.fullName}!
          </h2>
          <p>Disfruta de tu lectura.</p>
          
          <div>
            <p>Tu libro favorito es:</p>
            <p>"{user.favoriteBook}"</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}
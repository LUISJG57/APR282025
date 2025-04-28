import loginHandler from '../../../src/handlers/loginHandler';

export default async function handler(req, res) {
  // Solo permitir método POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  // Llamar al handler para procesar la petición
  return loginHandler(req, res);
}
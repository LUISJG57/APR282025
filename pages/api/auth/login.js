import loginHandler from '../../../src/handlers/loginHandler';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  return loginHandler(req, res);
}
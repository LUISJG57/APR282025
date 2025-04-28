import AuthController from '../controllers/authController';

export default async function loginHandler(req, res) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: 'Username y password son requeridos'
      });
    }

    const authController = new AuthController();
    const result = await authController.login(username, password);

    if (result.success) {
      return res.status(200).json({
        fullName: result.user.fullName,
        favoriteBook: result.user.favoriteBook
      });
    }

    return res.status(401).json({
      message: 'Usuario o contraseña incorrectos'
    });
  } catch (error) {
    console.error('Error en loginHandler:', error);
    return res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
}
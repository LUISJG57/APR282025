import AuthController from '../controllers/authController';

/**
 * Handler para manejar las solicitudes de login
 * Procesa la petición, valida la estructura y delega al controlador
 */
export default async function loginHandler(req, res) {
  try {
    const { username, password } = req.body;

    // Validar que los campos requeridos estén presentes
    if (!username || !password) {
      return res.status(400).json({
        message: 'Username y password son requeridos'
      });
    }

    // Delegamos la lógica de autenticación al controlador
    const authController = new AuthController();
    const result = await authController.login(username, password);

    // Si la autenticación es exitosa
    if (result.success) {
      return res.status(200).json({
        fullName: result.user.fullName,
        favoriteBook: result.user.favoriteBook
      });
    }

    // Si la autenticación falla
    return res.status(401).json({
      message: 'Usuario o contraseña incorrectos'
    });
  } catch (error) {
    // Manejo de errores inesperados
    console.error('Error en loginHandler:', error);
    return res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
}
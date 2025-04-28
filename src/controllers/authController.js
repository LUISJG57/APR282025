import AuthService from '../services/authService';

/**
 * Controlador para manejar la autenticación de usuarios
 * Coordina la lógica de negocios a través del servicio
 */
class AuthController {
  constructor() {
    this.authService = new AuthService();
  }

  /**
   * Método para manejar el proceso de login
   * @param {string} username - Nombre de usuario
   * @param {string} password - Contraseña
   * @returns {Object} Resultado de la autenticación
   */
  async login(username, password) {
    try {
      // Validar formato básico de los datos
      username = username.trim().toLowerCase();
      
      if (!username || !password) {
        return {
          success: false,
          message: 'Credenciales incompletas'
        };
      }

      // Llamar al servicio para verificar credenciales
      const user = await this.authService.validateCredentials(username, password);
      
      // Si se encontró un usuario, autenticación exitosa
      if (user) {
        return {
          success: true,
          user: user
        };
      }
      
      // Si no se encontró usuario, autenticación fallida
      return {
        success: false,
        message: 'Usuario o contraseña incorrectos'
      };
    } catch (error) {
      console.error('Error en AuthController.login:', error);
      return {
        success: false,
        message: 'Error al procesar la solicitud'
      };
    }
  }
}

export default AuthController;
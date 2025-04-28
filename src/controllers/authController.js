import AuthService from '../services/authService';

class AuthController {
  constructor() {
    this.authService = new AuthService();
  }

  /**
   * @param {string} username 
   * @param {string} password 
   * @returns {Object} 
   */
  async login(username, password) {
    try {
      username = username.trim().toLowerCase();
      
      if (!username || !password) {
        return {
          success: false,
          message: 'Credenciales incompletas'
        };
      }

      const user = await this.authService.validateCredentials(username, password);
      
      if (user) {
        return {
          success: true,
          user: user
        };
      }
      
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
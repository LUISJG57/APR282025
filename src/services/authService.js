import { students } from '../db/students';

/**
 * Servicio para manejar la lógica de autenticación
 * Contiene la lógica de negocio relacionada con la autenticación
 */
class AuthService {
  /**
   * Valida las credenciales del usuario contra la base de datos
   * @param {string} username - Nombre de usuario
   * @param {string} password - Contraseña
   * @returns {Object|null} Datos del usuario o null si no hay coincidencia
   */
  async validateCredentials(username, password) {
    try {
      // Buscar el usuario en la "base de datos"
      const user = students.find(
        student => student.username === username && student.password === password
      );
      
      // Si se encuentra el usuario, devolver sus datos
      if (user) {
        return {
          username: user.username,
          fullName: user.fullName,
          favoriteBook: user.favoriteBook
        };
      }
      
      // Si no hay coincidencia, devolver null
      return null;
    } catch (error) {
      console.error('Error en AuthService.validateCredentials:', error);
      throw new Error('Error al validar credenciales');
    }
  }
}

export default AuthService;
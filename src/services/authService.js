import { students } from '../db/students';


class AuthService {
  /**
   * @param {string} username 
   * @param {string} password
   * @returns {Object|null}
   */
  async validateCredentials(username, password) {
    try {
      const user = students.find(
        student => student.username === username && student.password === password
      );
      
      if (user) {
        return {
          username: user.username,
          fullName: user.fullName,
          favoriteBook: user.favoriteBook
        };
      }
      
      return null;
    } catch (error) {
      console.error('Error en AuthService.validateCredentials:', error);
      throw new Error('Error al validar credenciales');
    }
  }
}

export default AuthService;
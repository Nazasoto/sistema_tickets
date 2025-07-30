import api from './api.service';
import { API_ENDPOINTS } from '../config/api';
import { jwtDecode } from 'jwt-decode';

const AuthService = {
  // Iniciar sesión
  async login(credentials) {
    try {
      // Convertir email a username si es necesario
      const loginData = {
        username: credentials.email || credentials.username,
        password: credentials.password
      };
      
      const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, loginData);
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        // Obtener datos del usuario usando el token
        const userData = await this.getCurrentUser();
        return { ...response.data, user: userData };
      }
      return response.data;
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      throw error;
    }
  },

  // Cerrar sesión
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Obtener datos del usuario autenticado
  async getCurrentUser() {
    try {
      const response = await api.get(API_ENDPOINTS.USERS.PROFILE);
      const userData = response.data;
      localStorage.setItem('user', JSON.stringify(userData));
      return userData;
    } catch (error) {
      console.error('Error al obtener el usuario actual:', error);
      // Si hay un error, intentar obtener el usuario del token
      const token = this.getToken();
      if (token) {
        try {
          const decoded = jwtDecode(token);
          return { _id: decoded.id, role: decoded.role };
        } catch (e) {
          console.error('Error al decodificar el token:', e);
        }
      }
      throw error;
    }
  },

  // Verificar si el usuario está autenticado
  isAuthenticated() {
    return !!localStorage.getItem('token');
  },

  // Obtener token
  getToken() {
    return localStorage.getItem('token');
  },

  // Obtener datos del usuario del localStorage
  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
};

export default AuthService;

import api from './api.service';
import { API_ENDPOINTS } from '../config/api';

const AuthService = {
  // Iniciar sesión
  async login(credentials) {
    try {
      const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
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
      const response = await api.get(API_ENDPOINTS.AUTH.PROFILE);
      localStorage.setItem('user', JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      console.error('Error al obtener el usuario actual:', error);
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

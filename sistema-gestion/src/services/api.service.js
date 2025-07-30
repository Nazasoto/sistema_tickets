import axios from 'axios';
import { API_BASE_URL, HEADERS } from '../config/api';

// Crear instancia de axios con configuración base
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: HEADERS
});

// Interceptor para agregar el token de autenticación a las peticiones
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar respuestas exitosas
api.interceptors.response.use(
  (response) => {
    // Puedes modificar la respuesta exitosa aquí si es necesario
    return response.data;
  },
  (error) => {
    const originalRequest = error.config;
    
    // Si el error es 401 y no es una solicitud de autenticación
    if (error.response?.status === 401 && !originalRequest._retry) {
      // Marcar la solicitud como ya reintentada
      originalRequest._retry = true;
      
      // Limpiar credenciales inválidas
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Redirigir a la página de sesión expirada
      if (window.location.pathname !== '/session-expired') {
        window.location.href = '/session-expired';
      }
    }
    
    // Proporcionar un mensaje de error más descriptivo
    const errorMessage = error.response?.data?.message || 
                        error.response?.data?.error || 
                        error.message || 
                        'Error de conexión con el servidor';
    
    // Crear un nuevo error con el mensaje mejorado
    const apiError = new Error(errorMessage);
    apiError.status = error.response?.status;
    apiError.response = error.response;
    
    return Promise.reject(apiError);
  }
);

export default api;

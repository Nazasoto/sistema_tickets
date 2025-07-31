import axios from 'axios';

// Configuración de la API
const API_BASE_URL = 'http://localhost:5000/api';

// Crear instancia de Axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token de autenticación a las peticiones
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar respuestas
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Manejar errores de autenticación
    if (error.response?.status === 401) {
      // Redirigir al login si no estamos ya en la página de login
      if (window.location.pathname !== '/login') {
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
    
    // Proporcionar un mensaje de error más descriptivo
    const errorMessage = error.response?.data?.message || 
                        error.response?.data?.error || 
                        error.message || 
                        'Error de conexión con el servidor';
    
    const apiError = new Error(errorMessage);
    apiError.status = error.response?.status;
    apiError.response = error.response;
    
    return Promise.reject(apiError);
  }
);

export default api;

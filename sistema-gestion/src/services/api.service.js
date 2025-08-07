import axios from 'axios';

// Configuración de la API
const API_BASE_URL = '/api';

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
  (response) => {
    console.log('Respuesta de la API:', response.config.url, response.data);
    return response;
  },
  (error) => {
    console.error('Error en la petición a la API:', {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });

    // Manejar errores de autenticación
    if (error.response?.status === 401) {
      // Redirigir al login si no estamos ya en la página de login
      if (window.location.pathname !== '/login') {
        console.log('Redirigiendo al login por error 401');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
    
    // Proporcionar un mensaje de error más descriptivo
    let errorMessage = 'Error de conexión con el servidor';
    
    if (error.response) {
      // El servidor respondió con un estado fuera del rango 2xx
      errorMessage = error.response.data?.message || 
                    error.response.data?.error || 
                    `Error ${error.response.status}: ${error.response.statusText}`;
    } else if (error.request) {
      // La petición fue hecha pero no se recibió respuesta
      errorMessage = 'No se pudo conectar con el servidor. Verifica tu conexión a internet.';
    }
    
    const apiError = new Error(errorMessage);
    apiError.status = error.response?.status;
    apiError.response = error.response;
    
    return Promise.reject(apiError);
  }
);

export default api;

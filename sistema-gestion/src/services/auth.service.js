import api from './api.service';

const login = async (email, password) => {
  try {
    console.log('Iniciando sesión con:', { email, password: '***' });
    
    // Asegurémonos de que los datos se envíen correctamente
    const requestData = { email, password };
    console.log('Enviando datos al servidor:', { ...requestData, password: '***' });
    
    const response = await api.post('/auth/login', requestData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Respuesta del servidor (raw):', response);
    console.log('Datos de la respuesta:', response.data);
    
    // Verificar la respuesta exitosa
    if (response.data) {
      if (response.data.user) {
        // Guardar usuario en localStorage
        localStorage.setItem('user', JSON.stringify(response.data.user));
        console.log('Usuario autenticado:', response.data.user);
        return response.data.user;
      } else if (response.data.error) {
        throw new Error(response.data.error);
      }
    }
    
    throw new Error('Respuesta inesperada del servidor');
  } catch (error) {
    console.error('Error en el login:', error);
    let errorMessage = 'Error al iniciar sesión';
    
    if (error.response) {
      // El servidor respondió con un código de estado fuera del rango 2xx
      errorMessage = error.response.data?.error || errorMessage;
    } else if (error.request) {
      // La petición fue hecha pero no se recibió respuesta
      errorMessage = 'No se pudo conectar con el servidor. Verifica tu conexión a internet.';
    }
    
    throw new Error(errorMessage);
  }
};

const logout = () => {
  localStorage.removeItem('user');
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

const isAuthenticated = () => {
  return !!getCurrentUser();
};

const hasRole = (role) => {
  const user = getCurrentUser();
  return user && user.role === role;
};

export default {
  login,
  logout,
  getCurrentUser,
  isAuthenticated,
  hasRole
};

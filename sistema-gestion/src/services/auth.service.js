import api from './api.service';

const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    // Guardar usuario en localStorage
    if (response.data.user) {
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data.user;
  } catch (error) {
    console.error('Error en el login:', error);
    throw error;
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

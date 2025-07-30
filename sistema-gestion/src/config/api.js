// Configuración base de la API
export const API_BASE_URL = 'http://localhost:5000/api'; 

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    PROFILE: '/auth/me'
  },
  USERS: {
    BASE: '/users',
    PROFILE: '/users/profile'
  },
  TICKETS: {
    BASE: '/tickets'
  },
  AJUSTES: {
    BASE: '/ajustes'
  }
};

export const HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};

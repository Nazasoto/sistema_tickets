// Configuración base de la API
// Usamos ruta relativa para que funcione tanto en desarrollo como en producción
export const API_BASE_URL = "/api";

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

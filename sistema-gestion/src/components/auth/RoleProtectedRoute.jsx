import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import AuthService from '../../services/auth.service';
import LoadingSpinner from '../common/LoadingSpinner';

/**
 * Componente para proteger rutas según autenticación y rol del usuario.
 * @param {ReactNode} children - Componentes hijos a renderizar si pasa la protección.
 * @param {Array<string>} allowedRoles - Lista de roles permitidos (ej: ['admin', 'soporte'])
 * @param {string} [redirectTo='/dashboard'] - Ruta a la que redirigir si no cumple rol.
 */
const RoleProtectedRoute = ({ children, allowedRoles = [], redirectTo = '/dashboard' }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (AuthService.isAuthenticated()) {
          const currentUser = AuthService.getCurrentUser();
          setUser(currentUser);
          setIsAuthenticated(true);
        }
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (isLoading) return <LoadingSpinner />;

  if (!isAuthenticated) return <Navigate to="/login" />;

  if (allowedRoles.length > 0 && (!user || !allowedRoles.includes(user.role))) {
    return (
      <Navigate to={redirectTo} state={{ accessDenied: true }} replace />
    );
  }

  return children;
};

export default RoleProtectedRoute;

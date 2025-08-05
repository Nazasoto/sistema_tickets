import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AuthService from './services/auth.service';
import './css/main.css';

// Componentes
import Home from './components/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import SessionExpired from './components/auth/SessionExpired';
import Dashboard from './components/dashboard/Dashboard';
import TicketsList from './components/tickets/TicketsList';
import TicketDetail from './components/tickets/TicketDetail';
import NewTicket from './components/tickets/NewTicket';
import Profile from './components/user/Profile';
import NotFound from './components/common/NotFound';
import LoadingSpinner from './components/common/LoadingSpinner';

// Componente de ruta protegida
const ProtectedRoute = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (AuthService.isAuthenticated()) {
          // Verificar si el token sigue siendo válido
          await AuthService.getCurrentUser();
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error de autenticación:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(AuthService.isAuthenticated());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      if (isAuthenticated) {
        try {
          await AuthService.getCurrentUser();
        } catch (error) {
          console.error('Error al verificar autenticación:', error);
          AuthService.logout();
          setIsAuthenticated(false);
        }
      }
      setIsLoading(false);
    };

    verifyAuth();
  }, [isAuthenticated]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Router>
      <div className="app">
        <Routes>
          {/* Rutas públicas */}
          <Route path="/login" element={
            isAuthenticated ? <Navigate to="/dashboard" /> : <Login onLoginSuccess={() => setIsAuthenticated(true)} />
          } />
          <Route path="/register" element={
            isAuthenticated ? <Navigate to="/dashboard" /> : <Register />
          } />
          
          {/* Ruta de inicio redirige a login o dashboard según autenticación */}
          <Route path="/" element={
            isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
          } />

          {/* Rutas protegidas */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />

          <Route path="/tickets" element={
            <ProtectedRoute>
              <TicketsList />
            </ProtectedRoute>
          } />

          <Route path="/tickets/nuevo" element={
            <ProtectedRoute>
              <NewTicket />
            </ProtectedRoute>
          } />

          <Route path="/tickets/:id" element={
            <ProtectedRoute>
              <TicketDetail />
            </ProtectedRoute>
          } />

          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile onLogout={() => setIsAuthenticated(false)} />
            </ProtectedRoute>
          } />

          {/* Ruta para sesión expirada */}
          <Route path="/session-expired" element={<SessionExpired />} />
          
          {/* Ruta 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
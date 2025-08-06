import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import AuthService from '../../services/auth.service';
import { TicketService } from '../../services/ticket.service';
import AdminDashboard from './AdminDashboard/AdminDashboard';
import SoporteDashboard from './SoporteDashboard/SoporteDashboard';
import SucursalDashboard from './SucursalDashboard/SucursalDashboard';
import './Dashboard.css';

// Componente principal que renderiza el dashboard según el rol del usuario

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    totalTickets: 0,
    openTickets: 0,
    inProgressTickets: 0,
    closedTickets: 0
  });
  const [recentTickets, setRecentTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      setError('');
      
      try {
        console.log('Cargando datos del dashboard...');
        
        // Obtener datos del usuario
        const userData = AuthService.getCurrentUser();
        if (!userData) {
          throw new Error('No se encontró la información del usuario. Por favor, inicia sesión nuevamente.');
        }
        setUser(userData);

        console.log('Obteniendo tickets...');
        // Obtener tickets del backend
        const tickets = await TicketService.getAllTickets();
        
        if (!Array.isArray(tickets)) {
          throw new Error('Formato de datos inválido al cargar los tickets');
        }
        
        console.log(`Se obtuvieron ${tickets.length} tickets`);
        
        // Calcular estadísticas
        const totalTickets = tickets.length;
        const openTickets = tickets.filter(t => t.estado === 'Abierto').length;
        const inProgressTickets = tickets.filter(t => t.estado === 'En progreso').length;
        const closedTickets = tickets.filter(t => t.estado === 'Cerrado').length;

        console.log('Estadísticas calculadas:', { totalTickets, openTickets, inProgressTickets, closedTickets });
        
        setStats({
          totalTickets,
          openTickets,
          inProgressTickets,
          closedTickets
        });

        // Ordenar tickets por fecha y obtener los más recientes
        const sortedTickets = [...tickets]
          .sort((a, b) => {
            try {
              return new Date(b.fecha_creacion || 0) - new Date(a.fecha_creacion || 0);
            } catch (e) {
              console.error('Error al ordenar tickets por fecha:', e);
              return 0;
            }
          })
          .slice(0, 5);

        console.log('Tickets recientes:', sortedTickets);
        setRecentTickets(sortedTickets);
        
      } catch (error) {
        console.error('Error al cargar el dashboard:', error);
        const errorMessage = error.response?.data?.message || 
                         error.message || 
                         'Error al cargar los datos del dashboard. Verifica tu conexión e intenta de nuevo.';
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Redirigir al login si no hay usuario
  useEffect(() => {
    if (!user && !isLoading) {
      navigate('/login');
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p>Cargando tu panel de control...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-error">
        <div className="alert alert-danger">
          <h4>Error al cargar el dashboard</h4>
          <p>{error}</p>
          <button 
            className="btn btn-primary" 
            onClick={() => window.location.reload()}
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // No mostrar nada mientras se redirige
  }

  // Renderizar el dashboard según el rol del usuario
  let dashboardContent;
  
  switch(user.role) {
    case 'admin':
      dashboardContent = (
        <AdminDashboard 
          stats={stats} 
          recentTickets={recentTickets} 
        />
      );
      break;
      
    case 'soporte':
      dashboardContent = (
        <SoporteDashboard 
          recentTickets={recentTickets} 
          user={user} 
        />
      );
      break;
      
    case 'sucursal':
      dashboardContent = (
        <SucursalDashboard 
          user={user} 
        />
      );
      break;
      
    default:
      dashboardContent = (
        <div className="alert alert-warning">
          No tienes un rol asignado. Por favor, contacta al administrador.
        </div>
      );
  }

  return (
    <div className="dashboard">
      {dashboardContent}
    </div>
  );
};

export default Dashboard;

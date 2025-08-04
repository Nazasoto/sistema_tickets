import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../../services/auth.service';
import TicketService from '../../services/ticket.service';
import './Dashboard.css';
import './SucursalDashboard.css';

// Componentes de paneles según rol
const AdminDashboard = ({ stats, recentTickets }) => (
  <div className="admin-dashboard">
    <h2>Panel de Administración</h2>
    <div className="stats-container">
      <div className="stat-card">
        <h3>Total de Tickets</h3>
        <p className="stat-number">{stats.totalTickets}</p>
      </div>
      <div className="stat-card">
        <h3>Abiertos</h3>
        <p className="stat-number">{stats.openTickets}</p>
      </div>
      <div className="stat-card">
        <h3>En Progreso</h3>
        <p className="stat-number">{stats.inProgressTickets}</p>
      </div>
      <div className="stat-card">
        <h3>Cerrados</h3>
        <p className="stat-number">{stats.closedTickets}</p>
      </div>
    </div>
    
    <div className="recent-tickets">
      <h3>Tickets Recientes</h3>
      <div className="tickets-list">
        {recentTickets.length > 0 ? (
          recentTickets.map(ticket => (
            <div key={ticket.id} className="ticket-card">
              <h4>{ticket.titulo}</h4>
              <p>Estado: {ticket.estado}</p>
              <p>Prioridad: {ticket.prioridad}</p>
              <Link to={`/tickets/${ticket.id}`} className="btn btn-primary">Ver Detalles</Link>
            </div>
          ))
        ) : (
          <p>No hay tickets recientes.</p>
        )}
      </div>
    </div>
  </div>
);

const SoporteDashboard = ({ recentTickets, user }) => {
  const myTickets = recentTickets.filter(t => t.asignadoA === user.id);
  
  return (
    <div className="soporte-dashboard">
      <h2>Panel de Soporte Técnico</h2>
      <div className="welcome-message">
        <p>Bienvenido/a, {user.nombre}</p>
        <p>Estos son tus tickets asignados:</p>
      </div>
      
      <div className="my-tickets">
        <h3>Mis Tickets</h3>
        <div className="tickets-list">
          {myTickets.length > 0 ? (
            myTickets.map(ticket => (
              <div key={ticket.id} className="ticket-card">
                <h4>{ticket.titulo}</h4>
                <p>Estado: {ticket.estado}</p>
                <p>Prioridad: {ticket.prioridad}</p>
                <Link to={`/tickets/${ticket.id}`} className="btn btn-primary">Ver Detalles</Link>
              </div>
            ))
          ) : (
            <p>No tienes tickets asignados actualmente.</p>
          )}
        </div>
      </div>
    </div>
  );
};

const SucursalDashboard = ({ user }) => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    AuthService.logout();
    navigate('/login');
  };

  const actionCards = [
    {
      title: 'CREAR TICKET',
      icon: '📝',
      action: () => navigate('/tickets/nuevo'),
      className: 'card-primary'
    },
    {
      title: 'CHAT',
      icon: '💬',
      action: () => navigate('/chat'),
      className: 'card-info'
    },
    {
      title: 'NOTIFICACIONES',
      icon: '📢',
      action: () => navigate('/tickets'),
      className: 'card-noticias'
    },
    {
      title: 'HISTORIAL',
      icon: '📋',
      action: () => navigate('/tickets'),
      className: 'card-success'
    },
    {
      title: 'CONFIGURACION',
      icon: '⚙️',
      action: () => navigate('/configuracion'),
      className: 'card-warning'
    },
    {
      title: 'CERRAR SESION',
      icon: '🚪',
      action: handleLogout,
      className: 'card-danger'
    }
  ];

  return (
    <div className="sucursal-dashboard">
      <div className="dashboard-header">
        <div className="user-welcome">
          <h1>¡Hola, {user.nombre}!</h1>
          <p className="text-muted">¿En qué podemos ayudarte hoy?</p>
        </div>
        <div className="sucursal-info">
          <span className="badge bg-primary">Sucursal: {user.sucursal || 'Principal'}</span>
        </div>
      </div>
      
      <div className="dashboard-cards">
        {actionCards.map((card, index) => (
          <div 
            key={index} 
            className={`action-card ${card.className}`}
            onClick={card.action}
          >
            <div className="card-icon">{card.icon}</div>
            <h3>{card.title}</h3>
          </div>
        ))}
      </div>
      
      <div className="quick-stats">
        <div className="stat-item">
          <span className="stat-number">5</span>
          <span className="stat-label">Tickets abiertos</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">2</span>
          <span className="stat-label">En progreso</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">12</span>
          <span className="stat-label">Resueltos este mes</span>
        </div>
      </div>
    </div>
  );
};

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

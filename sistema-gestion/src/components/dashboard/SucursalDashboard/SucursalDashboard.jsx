import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../../services/auth.service';
import './SucursalDashboard.css';

const SucursalDashboard = ({ user = {} }) => {
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
      action: () => navigate('/notificaciones'),
      className: 'card-noticias'
    },
    {
      title: 'HISTORIAL',
      icon: '📋',
      action: () => navigate('/tickets'),
      className: 'card-success'
    },
    {
      title: 'CONFIGURACIÓN',
      icon: '⚙️',
      action: () => navigate('/configuracion'),
      className: 'card-warning'
    },
    {
      title: 'CERRAR SESIÓN',
      icon: '🚪',
      action: handleLogout,
      className: 'card-danger'
    }
  ];

  return (
    <div className="sucursal-dashboard">
      <div className="dashboard-header">
        <div className="user-welcome">
          <h1>¡Hola, {user.nombre || 'Usuario'}!</h1>
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
      
    </div>
  );
};

export default SucursalDashboard;

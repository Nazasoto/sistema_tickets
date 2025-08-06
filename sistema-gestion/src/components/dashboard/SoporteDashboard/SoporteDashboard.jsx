import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../../layout/Sidebar/Sidebar';
import './SoporteDashboard.css';

const SoporteDashboard = ({ user = {} }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  
  // Obtener el título de la página actual
  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('bandeja')) return 'Bandeja de Entrada';
    if (path.includes('mis-tickets')) return 'Mis Tickets';
    if (path.includes('historial')) return 'Historial';
    if (path.includes('chat')) return 'Chat de Soporte';
    if (path.includes('configuracion')) return 'Configuración';
    return 'Panel de Soporte';
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="soporte-layout">
      <button 
        className="mobile-menu-btn"
        onClick={toggleSidebar}
        aria-label="Menú de navegación"
      >
        ☰
      </button>
      
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />
      
      <main className="soporte-main-content">
        <header className="soporte-header">
          <h1>{getPageTitle()}</h1>
          <div className="user-info">
            <span>{user.nombre || 'Usuario'}</span>
            <span className="user-role">Soporte Técnico</span>
          </div>
        </header>
        
        <div className="soporte-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default SoporteDashboard;

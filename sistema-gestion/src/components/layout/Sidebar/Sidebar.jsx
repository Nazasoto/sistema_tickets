import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const menuItems = [
  { 
    id: 1, 
    title: 'Bandeja de Entrada', 
    icon: '📥',
    path: '/soporte/bandeja',
    badge: 5 // Ejemplo: 3 mensajes sin leer, la idea es que esto vaya cambiando segun los mensajes que se lleguen
  },
  { 
    id: 2, 
    title: 'Informes', 
    icon: '📋',
    path: '/soporte/informes'  
  },
  { 
    id: 3, 
    title: 'Historial', 
    icon: '🕒',
    path: '/soporte/historial'
  },
  { 
    id: 4, 
    title: 'Chat', 
    icon: '💬',
    path: '/soporte/chat',
    badge: 3 // Ejemplo: 3 mensajes sin leer, la idea es que esto vaya cambiando segun los mensajes que se lleguen
  },
  { 
    id: 5, 
    title: 'Configuración', 
    icon: '⚙️',
    path: '/soporte/configuracion'
  },
  { 
    id: 6, 
    title: 'Salir', 
    icon: '🚪',
    path: '/logout',
    className: 'logout-btn'
  }
];

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''} ${isOpen ? 'mobile-open' : ''}`}>
      <div className="sidebar-header">
        {!collapsed && <h3>Soporte Técnico</h3>}
        <button onClick={toggleSidebar} className="collapse-btn">
          {collapsed ? '→' : '←'}
        </button>
      </div>
      
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <Link
            key={item.id}
            to={item.path}
            className={`nav-item ${location.pathname === item.path ? 'active' : ''} ${item.className || ''}`}
            onClick={onClose}
          >
            <span className="nav-icon">{item.icon}</span>
            {!collapsed && (
              <>
                <span className="nav-title">{item.title}</span>
                {item.badge && <span className="nav-badge">{item.badge}</span>}
              </>
            )}
          </Link>
        ))}
      </nav>
      
      {!collapsed && (
        <div className="user-info">
          <div className="user-avatar">👤</div>
          <div className="user-details">
            <span className="user-name">Técnico</span>
            <span className="user-role">Soporte</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;

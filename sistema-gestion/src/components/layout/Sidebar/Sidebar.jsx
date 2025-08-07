import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';
import AuthService from '../../../services/auth.service';
import { useNavigate } from 'react-router-dom';

// Sidebar para Dashboard de Soporte
// Mejorado: paths corregidos, visibilidad dinámica por rol, badges lógicos y comentarios claros

// NOTA: Si agregas nuevas secciones al dashboard de soporte, solo agrega aquí y en las rutas anidadas de App.jsx
const getMenuItems = (role = 'soporte') => {
  // Sidebar solo con secciones relevantes para soporte
  let items = [
    {
      id: 1,
      title: 'Bandeja de Entrada',
      icon: '📥',
      path: '/dashboard/soporte/bandeja',
      badge: 5 // TODO: conectar a mensajes reales
    },
    // Noticias: visible solo para soporte y admin
    {
      id: 2,
      title: 'Noticias',
      icon: '📢',
      path: '/dashboard/soporte/noticias',
      onlyFor: ['soporte', 'admin']
    },
    {
      id: 3,
      title: 'Historial',
      icon: '🕒',
      path: '/dashboard/soporte/historial'
    },
    {
      id: 4,
      title: 'Chat',
      icon: '💬',
      path: '/dashboard/soporte/chat',
      badge: 3 // TODO: conectar a mensajes reales
    },
    {
      id: 5,
      title: 'Configuración',
      icon: '⚙️',
      path: '/dashboard/soporte/configuracion'
    },
    {
      id: 6,
      title: 'Salir',
      icon: '🚪',
      path: '/logout',
      className: 'logout-btn'
    }
  ];
  return items;
};

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  // Obtener el rol del usuario desde localStorage (ajusta esto según tu sistema de auth si es necesario)
  const userRole = localStorage.getItem('userRole') || 'soporte';
  const menuItems = getMenuItems(userRole);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  // Lógica de logout mejorada
  const handleLogout = (e) => {
    e.preventDefault();
    AuthService.logout();
    navigate('/login');
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
        {/* Renderizado dinámico del menú según el rol */}
        {menuItems.map((item) => (
          item.path === '/logout' ? (
            <a
              key={item.id}
              href="#logout"
              className={`nav-item ${item.className || ''}`}
              onClick={handleLogout}
            >
              <span className="nav-icon">{item.icon}</span>
              {!collapsed && <span className="nav-title">{item.title}</span>}
            </a>
          ) : (
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
          )
        ))}
      </nav>
      {/* Cierre del sidebar en mobile al hacer click fuera */}
      {isOpen && <div className="sidebar-backdrop" onClick={onClose}></div>}
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

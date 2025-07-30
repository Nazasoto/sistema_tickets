import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../../services/auth.service';
import TicketService from '../../services/ticket.service';
import './Dashboard.css';

const Dashboard = () => {
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
      try {
        // Obtener datos del usuario
        const userData = AuthService.getUser();
        setUser(userData);

        // Simular carga de estadísticas (reemplazar con llamadas reales a la API)
        setTimeout(() => {
          setStats({
            totalTickets: 24,
            openTickets: 8,
            inProgressTickets: 12,
            closedTickets: 4
          });

          // Simular tickets recientes
          setRecentTickets([
            { id: 1, title: 'Error en el sistema de facturación', status: 'En progreso', priority: 'Alta', date: '2023-11-10' },
            { id: 2, title: 'Solicitud de nuevo usuario', status: 'Abierto', priority: 'Media', date: '2023-11-09' },
            { id: 3, title: 'Problema con el inicio de sesión', status: 'Cerrado', priority: 'Alta', date: '2023-11-08' }
          ]);

          setIsLoading(false);
        }, 1000);

      } catch (error) {
        console.error('Error al cargar el dashboard:', error);
        setError('Error al cargar los datos del dashboard');
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner"></div>
        <p>Cargando dashboard...</p>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Bienvenido, {user ? user.nombre : 'Usuario'}</h1>
        <p>Panel de control del sistema de gestión de tickets</p>
      </header>

      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total de Tickets</h3>
          <p className="stat-number">{stats.totalTickets}</p>
          <Link to="/tickets" className="stat-link">Ver todos</Link>
        </div>

        <div className="stat-card">
          <h3>Abiertos</h3>
          <p className="stat-number open">{stats.openTickets}</p>
          <Link to="/tickets?status=abierto" className="stat-link">Ver abiertos</Link>
        </div>

        <div className="stat-card">
          <h3>En Progreso</h3>
          <p className="stat-number in-progress">{stats.inProgressTickets}</p>
          <Link to="/tickets?status=en-progreso" className="stat-link">Ver en progreso</Link>
        </div>

        <div className="stat-card">
          <h3>Cerrados</h3>
          <p className="stat-number closed">{stats.closedTickets}</p>
          <Link to="/tickets?status=cerrado" className="stat-link">Ver cerrados</Link>
        </div>
      </div>

      <div className="recent-tickets">
        <div className="section-header">
          <h2>Tickets Recientes</h2>
          <Link to="/tickets/nuevo" className="btn btn-primary">Nuevo Ticket</Link>
        </div>
        
        {recentTickets.length > 0 ? (
          <div className="tickets-table">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Título</th>
                  <th>Estado</th>
                  <th>Prioridad</th>
                  <th>Fecha</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {recentTickets.map(ticket => (
                  <tr key={ticket.id}>
                    <td>#{ticket.id}</td>
                    <td>{ticket.title}</td>
                    <td>
                      <span className={`status-badge ${ticket.status.toLowerCase().replace(' ', '-')}`}>
                        {ticket.status}
                      </span>
                    </td>
                    <td>
                      <span className={`priority-badge ${ticket.priority.toLowerCase()}`}>
                        {ticket.priority}
                      </span>
                    </td>
                    <td>{new Date(ticket.date).toLocaleDateString()}</td>
                    <td>
                      <Link to={`/tickets/${ticket.id}`} className="btn-link">Ver</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="no-tickets">
            <p>No hay tickets recientes.</p>
            <Link to="/tickets/nuevo" className="btn btn-primary">Crear mi primer ticket</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

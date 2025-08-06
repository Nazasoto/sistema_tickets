import React from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = ({ stats = {}, recentTickets = [] }) => {
  return (
    <div className="admin-dashboard">
      <h2>Panel de Administración</h2>
      <div className="stats-container">
        <div className="stat-card">
          <h3>Total de Tickets</h3>
          <p className="stat-number">{stats.totalTickets || 0}</p>
        </div>
        <div className="stat-card">
          <h3>Abiertos</h3>
          <p className="stat-number">{stats.openTickets || 0}</p>
        </div>
        <div className="stat-card">
          <h3>En Progreso</h3>
          <p className="stat-number">{stats.inProgressTickets || 0}</p>
        </div>
        <div className="stat-card">
          <h3>Cerrados</h3>
          <p className="stat-number">{stats.closedTickets || 0}</p>
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
};

export default AdminDashboard;

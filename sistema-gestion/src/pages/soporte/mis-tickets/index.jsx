import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MisTicketsPage = () => {
  const [activeTab, setActiveTab] = useState('todos');
  
  // Datos de ejemplo para tickets
  const tickets = [
    { 
      id: 1, 
      titulo: 'Error en el sistema de facturación', 
      prioridad: 'Alta', 
      estado: 'En progreso',
      fecha: '2025-08-06',
      sucursal: 'Sucursal Centro',
      asignado: 'Tú'
    },
    { 
      id: 2, 
      titulo: 'No se puede imprimir reportes', 
      prioridad: 'Media', 
      estado: 'En progreso',
      fecha: '2025-08-06',
      sucursal: 'Sucursal Norte',
      asignado: 'Tú'
    },
    { 
      id: 3, 
      titulo: 'Acceso denegado a módulo de inventario', 
      prioridad: 'Baja', 
      estado: 'Pendiente',
      fecha: '2025-08-05',
      sucursal: 'Sucursal Sur',
      asignado: 'Tú'
    },
    { 
      id: 4, 
      titulo: 'Error al cargar imágenes de productos', 
      prioridad: 'Alta', 
      estado: 'Cerrado',
      fecha: '2025-08-04',
      sucursal: 'Sucursal Este',
      asignado: 'Tú'
    },
  ];

  const getPriorityClass = (priority) => {
    switch(priority.toLowerCase()) {
      case 'alta': return 'badge-danger';
      case 'media': return 'badge-warning';
      case 'baja': 
      default: return 'badge-primary';
    }
  };

  const getStatusClass = (status) => {
    switch(status.toLowerCase()) {
      case 'en progreso': return 'badge-primary';
      case 'pendiente': return 'badge-warning';
      case 'cerrado': return 'badge-success';
      default: return 'bg-light text-dark';
    }
  };

  const filteredTickets = activeTab === 'todos' 
    ? tickets 
    : tickets.filter(ticket => 
        activeTab === 'abiertos' 
          ? ticket.estado !== 'Cerrado' 
          : ticket.estado.toLowerCase() === activeTab
      );

  return (
    <div className="page-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="section-title">Mis Tickets</h2>
        <div className="d-flex gap-2">
          <button className="btn btn-outline">
            <i className="bi bi-funnel me-2"></i>Filtrar
          </button>
          <button className="btn btn-outline">
            <i className="bi bi-arrow-clockwise me-2"></i>Actualizar
          </button>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="btn-group" role="group">
              <button 
                className={`btn ${activeTab === 'todos' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setActiveTab('todos')}
              >
                Todos
              </button>
              <button 
                className={`btn ${activeTab === 'abiertos' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setActiveTab('abiertos')}
              >
                Abiertos
              </button>
              <button 
                className={`btn ${activeTab === 'en progreso' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setActiveTab('en progreso')}
              >
                En Progreso
              </button>
              <button 
                className={`btn ${activeTab === 'pendiente' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setActiveTab('pendiente')}
              >
                Pendientes
              </button>
              <button 
                className={`btn ${activeTab === 'cerrado' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setActiveTab('cerrado')}
              >
                Cerrados
              </button>
            </div>
            <div>
              <span className="text-muted">
                Mostrando {filteredTickets.length} de {tickets.length} tickets
              </span>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Título</th>
                  <th>Prioridad</th>
                  <th>Estado</th>
                  <th>Fecha</th>
                  <th>Sucursal</th>
                  <th>Asignado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredTickets.map((ticket) => (
                  <tr key={ticket.id}>
                    <td>#{ticket.id}</td>
                    <td>
                      <Link to={`/soporte/ticket/${ticket.id}`} className="text-decoration-none">
                        {ticket.titulo}
                      </Link>
                    </td>
                    <td>
                      <span className={`badge ${getPriorityClass(ticket.prioridad)}`}>
                        {ticket.prioridad}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${getStatusClass(ticket.estado)}`}>
                        {ticket.estado}
                      </span>
                    </td>
                    <td>{ticket.fecha}</td>
                    <td>{ticket.sucursal}</td>
                    <td>{ticket.asignado}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <Link 
                          to={`/soporte/ticket/${ticket.id}`}
                          className="btn btn-sm btn-outline"
                        >
                          <i className="bi bi-eye"></i> Ver
                        </Link>
                        {ticket.estado !== 'Cerrado' && (
                          <button className="btn btn-sm btn-primary">
                            {ticket.estado === 'En progreso' ? 'Continuar' : 'Reabrir'}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredTickets.length === 0 && (
                  <tr>
                    <td colSpan="8" className="text-center py-4">
                      No hay tickets que coincidan con el filtro seleccionado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Resumen de Tickets</h5>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between mb-3">
                <span>Total de tickets:</span>
                <span className="fw-bold">{tickets.length}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>En progreso:</span>
                <span className="fw-bold text-primary">
                  {tickets.filter(t => t.estado === 'En progreso').length}
                </span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>Pendientes:</span>
                <span className="fw-bold text-warning">
                  {tickets.filter(t => t.estado === 'Pendiente').length}
                </span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Cerrados (últimos 7 días):</span>
                <span className="fw-bold text-success">
                  {tickets.filter(t => t.estado === 'Cerrado').length}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Acciones Rápidas</h5>
            </div>
            <div className="card-body">
              <div className="d-grid gap-2">
                <button className="btn btn-primary">
                  <i className="bi bi-plus-circle me-2"></i>Nuevo Ticket
                </button>
                <button className="btn btn-outline-primary">
                  <i className="bi bi-people me-2"></i>Asignar Ticket
                </button>
                <button className="btn btn-outline-secondary">
                  <i className="bi bi-graph-up me-2"></i>Ver Reportes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MisTicketsPage;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const HistorialPage = () => {
  const [dateRange, setDateRange] = useState('7days');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Datos de ejemplo para tickets cerrados
  const tickets = [
    { 
      id: 1, 
      titulo: 'Error en el sistema de facturación', 
      prioridad: 'Alta', 
      estado: 'Cerrado',
      fechaCierre: '2025-08-05',
      fechaApertura: '2025-08-01',
      sucursal: 'Sucursal Centro',
      tecnico: 'Tú',
      tiempoResolucion: '4 días',
      calificacion: 5
    },
    { 
      id: 2, 
      titulo: 'No se puede imprimir reportes', 
      prioridad: 'Media', 
      estado: 'Cerrado',
      fechaCierre: '2025-08-04',
      fechaApertura: '2025-08-02',
      sucursal: 'Sucursal Norte',
      tecnico: 'Tú',
      tiempoResolucion: '2 días',
      calificacion: 4
    },
    { 
      id: 3, 
      titulo: 'Acceso denegado a módulo de inventario', 
      prioridad: 'Baja', 
      estado: 'Cerrado',
      fechaCierre: '2025-08-03',
      fechaApertura: '2025-07-30',
      sucursal: 'Sucursal Sur',
      tecnico: 'Tú',
      tiempoResolucion: '4 días',
      calificacion: 5
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

  const filteredTickets = tickets.filter(ticket => {
    // Filtrar por rango de fechas
    const today = new Date();
    const ticketDate = new Date(ticket.fechaCierre);
    const diffTime = Math.abs(today - ticketDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    let dateFilter = true;
    if (dateRange === '7days' && diffDays > 7) dateFilter = false;
    if (dateRange === '30days' && diffDays > 30) dateFilter = false;
    
    // Filtrar por término de búsqueda
    const searchFilter = searchTerm === '' || 
      ticket.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.sucursal.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id.toString().includes(searchTerm);
    
    return dateFilter && searchFilter;
  });

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <i 
        key={i} 
        className={`bi ${i < rating ? 'bi-star-fill text-warning' : 'bi-star'}`}
      ></i>
    ));
  };

  return (
    <div className="page-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="section-title">Historial de Tickets</h2>
        <div className="d-flex gap-2">
          <div className="input-group" style={{ maxWidth: '300px' }}>
            <span className="input-group-text">
              <i className="bi bi-search"></i>
            </span>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Buscar tickets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select 
            className="form-select" 
            style={{ width: 'auto' }}
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option value="7days">Últimos 7 días</option>
            <option value="30days">Últimos 30 días</option>
            <option value="all">Todo el historial</option>
          </select>
          <button className="btn btn-outline">
            <i className="bi bi-download me-2"></i>Exportar
          </button>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Título</th>
                  <th>Prioridad</th>
                  <th>Sucursal</th>
                  <th>Fecha Apertura</th>
                  <th>Fecha Cierre</th>
                  <th>Tiempo Resolución</th>
                  <th>Técnico</th>
                  <th>Calificación</th>
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
                    <td>{ticket.sucursal}</td>
                    <td>{ticket.fechaApertura}</td>
                    <td>{ticket.fechaCierre}</td>
                    <td>{ticket.tiempoResolucion}</td>
                    <td>{ticket.tecnico}</td>
                    <td>
                      <div className="text-warning">
                        {renderStars(ticket.calificacion)}
                      </div>
                    </td>
                    <td>
                      <Link 
                        to={`/soporte/ticket/${ticket.id}`}
                        className="btn btn-sm btn-outline"
                      >
                        <i className="bi bi-eye me-1"></i> Ver
                      </Link>
                    </td>
                  </tr>
                ))}
                {filteredTickets.length === 0 && (
                  <tr>
                    <td colSpan="10" className="text-center py-4">
                      No se encontraron tickets que coincidan con los filtros seleccionados.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Estadísticas de Resolución</h5>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between mb-3">
                <span>Tickets cerrados (últimos 30 días):</span>
                <span className="fw-bold">24</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>Tiempo promedio de resolución:</span>
                <span className="fw-bold"> 2.3 minutos * problema</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>Calificación promedio:</span>
                <span className="fw-bold">4.7/5</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="card-title mb-0">Tickets por Prioridad</h5>
              <span className="badge bg-primary">Últimos 30 días</span>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between mb-2">
                <span>Alta</span>
                <div className="d-flex align-items-center">
                  <div className="progress" style={{ width: '150px' }}>
                    <div 
                      className="progress-bar bg-danger" 
                      role="progressbar" 
                      style={{ width: '30%' }}
                      aria-valuenow="30" 
                      aria-valuemin="0" 
                      aria-valuemax="100"
                    ></div>
                  </div>
                  <span className="ms-2">8</span>
                </div>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Media</span>
                <div className="d-flex align-items-center">
                  <div className="progress" style={{ width: '150px' }}>
                    <div 
                      className="progress-bar bg-warning" 
                      role="progressbar" 
                      style={{ width: '50%' }}
                      aria-valuenow="50" 
                      aria-valuemin="0" 
                      aria-valuemax="100"
                    ></div>
                  </div>
                  <span className="ms-2">12</span>
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <span>Baja</span>
                <div className="d-flex align-items-center">
                  <div className="progress" style={{ width: '150px' }}>
                    <div 
                      className="progress-bar bg-primary" 
                      role="progressbar" 
                      style={{ width: '20%' }}
                      aria-valuenow="20" 
                      aria-valuemin="0" 
                      aria-valuemax="100"
                    ></div>
                  </div>
                  <span className="ms-2">4</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistorialPage;

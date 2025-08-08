import React from 'react';
import { Link } from 'react-router-dom';

const BandejaPage = () => {
  // Datos de ejemplo para tickets
  const tickets = [
    { 
      id: 1, 
      titulo: 'Error en el sistema de facturación', 
      prioridad: 'Alta', 
      estado: 'Nuevo',
      fecha: '2025-08-06',
      sucursal: '34'
    },
    { 
      id: 2, 
      titulo: 'No se puede imprimir reportes', 
      prioridad: 'Media', 
      estado: 'Nuevo',
      fecha: '2025-08-06',
      sucursal: '24'
    },
    { 
      id: 3, 
      titulo: 'Acceso denegado a módulo de inventario', 
      prioridad: 'Baja', 
      estado: 'En revisión',
      fecha: '2025-08-05',
      sucursal: '52'
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

  return (
    <div className="page-container">
      <h1>ESTAMOS TRABAJANDO EN ESTO</h1>
      {/*<div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="section-title">Bandeja de Entrada</h2>
        <div className="d-flex gap-2">
          <button className="btn btn-outline">
            <i className="bi bi-funnel me-2"></i>Filtrar
          </button>
          <button className="btn btn-outline">
            <i className="bi bi-arrow-clockwise me-2"></i>Actualizar
          </button>
        </div>
      </div>

      <div className="card">
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
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
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
                    <span className="badge bg-light text-dark">
                      {ticket.estado}
                    </span>
                  </td>
                  <td>{ticket.fecha}</td>
                  <td>{ticket.sucursal}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <button className="btn btn-sm btn-outline">
                        <i className="bi bi-eye"></i>
                      </button>
                      <button className="btn btn-sm btn-primary">
                        Tomar Ticket
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {tickets.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-4">
                    No hay tickets nuevos en la bandeja de entrada.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div> */}
    </div>
  );
};

export default BandejaPage;

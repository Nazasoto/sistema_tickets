import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TicketService } from '../../services/ticket.service';

const TicketDetail = () => {
  const { id } = useParams();
  const [ticket, setTicket] = useState({});

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await TicketService.getTicketById(id);
        setTicket(response.data);
      } catch (error) {
        console.error(`Error al obtener el ticket con ID ${id}:`, error);
      }
    };

    fetchTicket();
  }, [id]);

  return (
    <div className="ticket-detail">
      <h2>Detalles del Ticket #{id}</h2>
      <div className="ticket-info">
        <p>
          <strong>Nro. de Sucursal:</strong> {ticket.sucursal_number}
        </p>
        <p>
          <strong>Ciudad:</strong> {ticket.city}
        </p>
        <p>
          <strong>Detalle del Problema:</strong> {ticket.problem_description}
        </p>
        <p>
          <strong>Correo Electrónico:</strong> {ticket.email}
        </p>
        <p>
          <strong>Fecha de Solicitud:</strong> {ticket.request_date}
        </p>
        <p>
          <strong>Hora del Pedido de Asistencia:</strong> {ticket.request_time}
        </p>
        <p>
          <strong>Medio de Contacto:</strong> {ticket.contact_method}
        </p>
        <p>
          <strong>Nombre del Contacto:</strong> {ticket.contact_name}
        </p>
        <p>
          <strong>Teléfono:</strong> {ticket.phone}
        </p>
        <p>
          <strong>Turno Asignado:</strong> {ticket.assigned_turn}
        </p>
        <p>
          <strong>Urgencia:</strong> {ticket.urgency}
        </p>
        <p>
          <strong>Archivo de Procesamiento:</strong> {ticket.processing_file ? (
            <a href={ticket.processing_file} target="_blank" rel="noopener noreferrer">
              {ticket.processing_file}
            </a>
          ) : (
            'No hay archivo de procesamiento.'
          )}
        </p>
      </div>
    </div>
  );
};

export default TicketDetail;

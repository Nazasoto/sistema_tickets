import React from 'react';
import { useParams } from 'react-router-dom';

const TicketDetail = () => {
  const { id } = useParams();
  
  return (
    <div className="ticket-detail">
      <h2>Detalles del Ticket #{id}</h2>
      <div className="ticket-info">
        <p>Aquí se mostrarán los detalles del ticket seleccionado.</p>
      </div>
    </div>
  );
};

export default TicketDetail;

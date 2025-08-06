import ticketService from '../../../backend/services/ticket.service.js';

export default async function handler(req, res) {
  const { id } = req.query;
  
  try {
    // Obtener un ticket por ID
    if (req.method === 'GET') {
      const ticket = await ticketService.getById(parseInt(id));
      if (!ticket) {
        return res.status(404).json({ error: 'Ticket no encontrado' });
      }
      return res.status(200).json(ticket);
    }
    
    // Actualizar un ticket
    if (req.method === 'PUT' || req.method === 'PATCH') {
      const updatedTicket = await ticketService.update(parseInt(id), req.body);
      return res.status(200).json(updatedTicket);
    }
    
    // Eliminar un ticket
    if (req.method === 'DELETE') {
      await ticketService.delete(parseInt(id));
      return res.status(204).end();
    }
    
    // Si el método no es GET, PUT, PATCH ni DELETE
    return res.status(405).json({ error: 'Método no permitido' });
    
  } catch (error) {
    console.error(`Error en la API de ticket ${id}:`, error);
    const statusCode = error.message.includes('no encontrado') ? 404 : 500;
    res.status(statusCode).json({ 
      error: error.message || 'Error interno del servidor' 
    });
  }
}

import ticketService from '../../backend/services/ticket.service.js';

export default async function handler(req, res) {
  try {
    // Manejar método GET - Obtener todos los tickets
    if (req.method === 'GET') {
      const tickets = await ticketService.getAll(req.query);
      return res.status(200).json(tickets);
    }
    
    // Manejar método POST - Crear un nuevo ticket
    if (req.method === 'POST') {
      const newTicket = await ticketService.create(req.body);
      return res.status(201).json(newTicket);
    }
    
    // Si el método no es GET ni POST
    return res.status(405).json({ error: 'Método no permitido' });
    
  } catch (error) {
    console.error('Error en la API de tickets:', error);
    const statusCode = error.message.includes('no encontrado') ? 404 : 500;
    res.status(statusCode).json({ 
      error: error.message || 'Error interno del servidor' 
    });
  }
}

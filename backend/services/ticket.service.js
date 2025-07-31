import JsonDB from './jsonDB.service.js';

const db = new JsonDB('tickets');

class TicketService {
  async getAll(filters = {}) {
    let tickets = await db.getAll('tickets');
    
    // Aplicar filtros si existen
    if (Object.keys(filters).length > 0) {
      tickets = tickets.filter(ticket => {
        return Object.entries(filters).every(([key, value]) => {
          // Manejar búsqueda por rango de fechas
          if (key === 'fechaInicio' && value) {
            return new Date(ticket.fechaCreacion) >= new Date(value);
          }
          if (key === 'fechaFin' && value) {
            return new Date(ticket.fechaCreacion) <= new Date(value);
          }
          
          // Búsqueda por otros campos
          return ticket[key] === value;
        });
      });
    }
    
    // Ordenar por fecha de creación (más recientes primero)
    return tickets.sort((a, b) => 
      new Date(b.fechaCreacion) - new Date(a.fechaCreacion)
    );
  }

  async getById(id) {
    return await db.getById('tickets', id);
  }

  async getByUser(userId) {
    return await db.find('tickets', { usuarioId: userId });
  }

  async getByAssigned(userId) {
    return await db.find('tickets', { asignadoA: userId });
  }

  async create(ticketData) {
    const newTicket = {
      ...ticketData,
      estado: 'abierto', // Estado por defecto
      fechaCreacion: new Date().toISOString(),
      fechaActualizacion: new Date().toISOString()
    };

    return await db.create('tickets', newTicket);
  }

  async update(id, updates) {
    const ticket = await this.getById(id);
    if (!ticket) {
      throw new Error('Ticket no encontrado');
    }

    const updatedTicket = {
      ...updates,
      id, // Asegurarse de que el ID no se modifique
      fechaActualizacion: new Date().toISOString()
    };

    return await db.update('tickets', id, updatedTicket);
  }

  async delete(id) {
    const ticket = await this.getById(id);
    if (!ticket) {
      throw new Error('Ticket no encontrado');
    }
    return await db.delete('tickets', id);
  }

  async changeStatus(id, newStatus, userId) {
    const validStatuses = ['abierto', 'en_progreso', 'en_revision', 'cerrado'];
    if (!validStatuses.includes(newStatus)) {
      throw new Error('Estado no válido');
    }

    return this.update(id, { 
      estado: newStatus,
      actualizadoPor: userId
    });
  }

  async assignTo(ticketId, userId) {
    return this.update(ticketId, { 
      asignadoA: userId,
      estado: 'en_progreso'
    });
  }
}

export default new TicketService();

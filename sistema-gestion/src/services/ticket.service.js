import api from './api.service';
import { API_ENDPOINTS } from '../config/api';

export const TicketService = {
  // Obtener todos los tickets
  async getAllTickets() {
    try {
      const response = await api.get(API_ENDPOINTS.TICKETS.BASE);
      return response.data;
    } catch (error) {
      console.error('Error al obtener los tickets:', error);
      throw error;
    }
  },

  // Obtener un ticket por ID
  async getTicketById(id) {
    try {
      const response = await api.get(`${API_ENDPOINTS.TICKETS.BASE}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener el ticket con ID ${id}:`, error);
      throw error;
    }
  },

  // Crear un nuevo ticket
  async createTicket(ticketData) {
    try {
      const response = await api.post(API_ENDPOINTS.TICKETS.BASE, ticketData);
      return response.data;
    } catch (error) {
      console.error('Error al crear el ticket:', error);
      throw error;
    }
  },

  // Actualizar un ticket existente
  async updateTicket(id, ticketData) {
    try {
      const response = await api.put(`${API_ENDPOINTS.TICKETS.BASE}/${id}`, ticketData);
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar el ticket con ID ${id}:`, error);
      throw error;
    }
  },

  // Eliminar un ticket
  async deleteTicket(id) {
    try {
      const response = await api.delete(`${API_ENDPOINTS.TICKETS.BASE}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al eliminar el ticket con ID ${id}:`, error);
      throw error;
    }
  },

  // Cambiar el estado de un ticket
  async updateTicketStatus(id, status) {
    try {
      const response = await api.patch(`${API_ENDPOINTS.TICKETS.BASE}/${id}/status`, { status });
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar el estado del ticket con ID ${id}:`, error);
      throw error;
    }
  }
};

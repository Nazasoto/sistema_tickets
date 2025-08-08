import api from './api.service';
import { API_ENDPOINTS } from '../config/api';

export const TicketService = {
  // Obtener todos los tickets
  async getAllTickets() {
    try {
      const response = await api.get(API_ENDPOINTS.TICKETS.BASE);
      
      if (!response || !response.data) {
        console.error('Respuesta inesperada del servidor:', response);
        throw new Error('Respuesta inesperada del servidor');
      }
      return response.data;
    } catch (error) {
      console.error('Error al obtener los tickets:', error);
      if (error.response) {
        // El servidor respondió con un código de estado fuera del rango 2xx
        console.error('Datos de la respuesta de error:', error.response.data);
        console.error('Estado de la respuesta:', error.response.status);
        console.error('Cabeceras de la respuesta:', error.response.headers);
        throw new Error(error.response.data.message || 'Error al cargar los tickets');
      } else if (error.request) {
        // La solicitud fue hecha pero no se recibió respuesta
        console.error('No se recibió respuesta del servidor:', error.request);
        throw new Error('No se pudo conectar con el servidor. Verifica tu conexión a internet.');
      } else {
        // Algo sucedió en la configuración de la solicitud que generó un error
        console.error('Error al configurar la solicitud:', error.message);
        throw new Error('Error al procesar la solicitud');
      }
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

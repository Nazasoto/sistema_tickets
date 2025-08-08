import axios from 'axios';

const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://soporte-8ja2.onrender.com/api/noticias'
  : '/api/noticias';

export const getNoticias = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const crearNoticia = async (noticia) => {
  const res = await axios.post(API_URL, noticia);
  return res.data;
};

export const archivarNoticia = async (id) => {
  const res = await axios.patch(`${API_URL}/${id}/archivar`);
  return res.data;
};

export const borrarNoticia = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};

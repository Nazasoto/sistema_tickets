// Backend Express para noticias (en memoria, fácil de adaptar a MongoDB)
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4001;

app.use(cors());
app.use(express.json());

// Noticias en memoria (simulación)
let noticias = [];
let nextId = 1;

// GET /api/noticias - listar todas
app.get('/api/noticias', (req, res) => {
  res.json(noticias);
});

// POST /api/noticias - crear noticia
app.post('/api/noticias', (req, res) => {
  const { titulo, descripcion, autor, fecha, imagen, archivoNombre, links } = req.body;
  if (!titulo || !descripcion) {
    return res.status(400).json({ error: 'Título y descripción requeridos' });
  }
  const noticia = {
    id: nextId++,
    titulo,
    descripcion,
    autor: autor || 'soporte',
    fecha: fecha || new Date().toISOString().slice(0,10),
    imagen: imagen || '',
    archivoNombre: archivoNombre || '',
    links: links || [],
    archivada: false
  };
  noticias.unshift(noticia);
  res.status(201).json(noticia);
});

// PATCH /api/noticias/:id/archivar - archivar noticia
app.patch('/api/noticias/:id/archivar', (req, res) => {
  const id = parseInt(req.params.id);
  const noticia = noticias.find(n => n.id === id);
  if (!noticia) return res.status(404).json({ error: 'No encontrada' });
  noticia.archivada = true;
  res.json(noticia);
});

// DELETE /api/noticias/:id - borrar noticia
app.delete('/api/noticias/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const idx = noticias.findIndex(n => n.id === id);
  if (idx === -1) return res.status(404).json({ error: 'No encontrada' });
  noticias.splice(idx, 1);
  res.status(204).end();
});

// (Opcional) GET /api/noticias/:id
app.get('/api/noticias/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const noticia = noticias.find(n => n.id === id);
  if (!noticia) return res.status(404).json({ error: 'No encontrada' });
  res.json(noticia);
});

app.listen(PORT, () => {
  console.log(`Backend de noticias corriendo en http://localhost:${PORT}`);
});

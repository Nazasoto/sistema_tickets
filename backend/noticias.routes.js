import { Router } from 'express';

const router = Router();

// Simulación de base de datos en memoria para noticias
let noticias = [
  // Puedes migrar aquí las noticias iniciales si las tienes
];

// GET /api/noticias
router.get('/', (req, res) => {
  res.json(noticias);
});

// POST /api/noticias
router.post('/', (req, res) => {
  const noticia = req.body;
  noticia.id = noticias.length ? noticias[noticias.length - 1].id + 1 : 1;
  noticias.push(noticia);
  res.status(201).json(noticia);
});

// DELETE /api/noticias/:id
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const idx = noticias.findIndex(n => n.id === id);
  if (idx === -1) return res.status(404).json({ error: 'No encontrada' });
  noticias.splice(idx, 1);
  res.status(204).end();
});

// GET /api/noticias/:id
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const noticia = noticias.find(n => n.id === id);
  if (!noticia) return res.status(404).json({ error: 'No encontrada' });
  res.json(noticia);
});

export default router;

import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs/promises';

// Importar servicios
import userService from './services/user.service.js';
import ticketService from './services/ticket.service.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Servir archivos estáticos del frontend
const frontendPath = join(__dirname, '../sistema-gestion/dist');
app.use(express.static(frontendPath));

// Middleware para manejar rutas de API
app.use('/api', (req, res, next) => {
  next();
});

// Crear directorio de datos si no existe
const dataDir = join(__dirname, 'data');
fs.mkdir(dataDir, { recursive: true }).catch(console.error);

// Rutas de autenticación
app.post('/api/auth/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    console.log('Intento de inicio de sesión para:', email); // Log para depuración
    
    if (!email || !password) {
      console.log('Faltan credenciales');
      return res.status(400).json({ error: 'Email y contraseña son requeridos' });
    }

    const user = await userService.validateCredentials(email, password);
    console.log('Resultado de validación:', user ? 'Éxito' : 'Falló'); // Log para depuración
    
    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // En un entorno real, aquí generaríamos un token JWT
    // Por ahora, devolvemos el usuario sin la contraseña
    res.json({ 
      success: true,
      user: {
        id: user.id,
        email: user.email,
        nombre: user.nombre,
        role: user.role || 'usuario'
      }
    });
  } catch (error) {
    console.error('Error en el login:', error);
    next(error);
  }
});

// Rutas de usuarios
app.get('/api/usuarios', async (req, res, next) => {
  try {
    const users = await userService.getAll();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

app.get('/api/usuarios/:id', async (req, res, next) => {
  try {
    const user = await userService.getById(parseInt(req.params.id));
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
});

// Rutas de tickets
app.get('/api/tickets', async (req, res, next) => {
  try {
    const tickets = await ticketService.getAll(req.query);
    res.json(tickets);
  } catch (error) {
    next(error);
  }
});

app.post('/api/tickets', async (req, res, next) => {
  try {
    const newTicket = await ticketService.create(req.body);
    res.status(201).json(newTicket);
  } catch (error) {
    next(error);
  }
});

// --- NOTICIAS EN MEMORIA ---
let noticias = [];
let nextId = 1;

// GET /api/noticias
app.get('/api/noticias', (req, res) => {
  res.json(noticias);
});

// POST /api/noticias
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

// PATCH /api/noticias/:id/archivar
app.patch('/api/noticias/:id/archivar', (req, res) => {
  const id = parseInt(req.params.id);
  const noticia = noticias.find(n => n.id === id);
  if (!noticia) return res.status(404).json({ error: 'No encontrada' });
  noticia.archivada = true;
  res.json(noticia);
});

// DELETE /api/noticias/:id
app.delete('/api/noticias/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const idx = noticias.findIndex(n => n.id === id);
  if (idx === -1) return res.status(404).json({ error: 'No encontrada' });
  noticias.splice(idx, 1);
  res.status(204).end();
});

// GET /api/noticias/:id
app.get('/api/noticias/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const noticia = noticias.find(n => n.id === id);
  if (!noticia) return res.status(404).json({ error: 'No encontrada' });
  res.json(noticia);
});

// Ruta de prueba
app.get('/api', (req, res) => {
  res.json({ 
    message: 'API funcionando correctamente',
    rutas_disponibles: [
      'POST /api/auth/login',
      'GET /api/usuarios',
      'GET /api/usuarios/:id',
      'GET /api/tickets',
      'POST /api/tickets'
    ]
  });
});

// Manejador de errores
app.use((err, req, res, next) => {
  console.error('Error:', err);
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Error interno del servidor';
  res.status(statusCode).json({ error: message });
});

// Middleware para manejar rutas de SPA
app.get('*', (req, res) => {
  res.sendFile(join(frontendPath, 'index.html'));
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`📂 Directorio de datos: ${dataDir}`);
  console.log('\nEndpoints disponibles:');
  console.log(`- POST   http://localhost:${PORT}/api/auth/login`);
  console.log(`- GET    http://localhost:${PORT}/api/usuarios`);
  console.log(`- GET    http://localhost:${PORT}/api/usuarios/:id`);
  console.log(`- GET    http://localhost:${PORT}/api/tickets`);
  console.log(`- POST   http://localhost:${PORT}/api/tickets\n`);
});

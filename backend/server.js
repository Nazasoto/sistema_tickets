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

// Crear directorio de datos si no existe
const dataDir = join(__dirname, 'data');
fs.mkdir(dataDir, { recursive: true }).catch(console.error);

// Rutas de autenticación
app.post('/api/auth/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña son requeridos' });
    }

    const user = await userService.validateCredentials(email, password);
    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // En un entorno real, aquí generaríamos un token JWT
    // Por ahora, devolvemos el usuario sin la contraseña
    res.json({ user });
  } catch (error) {
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

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📂 Directorio de datos: ${dataDir}`);
  console.log('\nEndpoints disponibles:');
  console.log(`- POST   http://localhost:${PORT}/api/auth/login`);
  console.log(`- GET    http://localhost:${PORT}/api/usuarios`);
  console.log(`- GET    http://localhost:${PORT}/api/usuarios/:id`);
  console.log(`- GET    http://localhost:${PORT}/api/tickets`);
  console.log(`- POST   http://localhost:${PORT}/api/tickets\n`);
});

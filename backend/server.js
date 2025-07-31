import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import 'dotenv/config';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
import usuariosRouter from './routes/usuarios.route.js';
app.use('/api/usuarios', usuariosRouter);

// Ruta de prueba
app.get('/api', (req, res) => {
  res.json({ message: 'API funcionando correctamente' });
});

// Manejador de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo salió mal en el servidor' });
});

// Iniciar servidor
const startServer = async () => {
  try {
    await connectDB();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
      console.log(`Ruta del archivo de usuarios: ${require('path').join(__dirname, 'data/users.json')}`);
    });
  } catch (error) {
    console.error('No se pudo iniciar el servidor:', error);
    process.exit(1);
  }
};

startServer();

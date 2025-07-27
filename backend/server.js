const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db'); // <-- asegurate que el path esté bien
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/usuarios', require('./routes/usuarios.route'));

// Conexión y servidor
connectDB().then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
});

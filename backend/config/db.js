const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
require('dotenv').config();

let mongoServer;

const connectDB = async () => {
  try {
    // Determinar si usar MongoDB local o en memoria
    const useMemoryDB = process.env.USE_MEMORY_DB === 'true';
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/ticketsApp';

    if (useMemoryDB) {
      console.log('🔗 Conectando a MongoDB en Memoria');
      mongoServer = await MongoMemoryServer.create({
        instance: {
          port: 27018,
          ip: '127.0.0.1',
          replSet: false
        },
        binary: {
          version: '4.4.19',
          downloadDir: './mongodb-binaries',
          platform: 'win32',
          arch: 'x64'
        }
      });
      const uri = mongoServer.getUri();
      
      if (!uri) {
        throw new Error("No se pudo obtener la URI de MongoMemoryServer");
      }

      await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('✅ Conectado a MongoDB en memoria');
    } else {
      console.log('🔗 Conectando a MongoDB local');
      await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('✅ Conectado a MongoDB local');
    }
  } catch (err) {
    console.error('❌ Error al conectar con MongoDB:', err);
    throw err;
  }
};

const disconnectDB = async () => {
  await mongoose.disconnect();
  if (mongoServer) {
    await mongoServer.stop();
    mongoServer = null;
  }
};

module.exports = { connectDB, disconnectDB };

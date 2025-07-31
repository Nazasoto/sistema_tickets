
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const usersFilePath = path.join(__dirname, '../data/users.json');

const readUsersFile = async () => {
  try {
    const data = await fs.readFile(usersFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error al leer el archivo de usuarios:', error);
    throw error;
  }
};

const writeUsersFile = async (data) => {
  try {
    await fs.writeFile(usersFilePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error('Error al escribir en el archivo de usuarios:', error);
    throw error;
  }
};

// const disconnectDB = async () => {
//   await db.terminate();
// };

// module.exports = { connectDB, disconnectDB };


// Traemos datos del json que está en la carpeta data
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const connectDB = async () => {
    try {
        console.log('Conectando al archivo de usuarios');
        const db = {
            getUsers: async () => {
                const data = await readUsersFile();
                return data.users;
            },
            getUserById: async (id) => {
                const data = await readUsersFile();
                return data.users.find(user => user.id === id);
            },
            getUserByEmail: async (email) => {
                const data = await readUsersFile();
                return data.users.find(user => user.email === email);
            },
            createUser: async (user) => {
                const data = await readUsersFile();
                const newUser = { ...user, id: Date.now() };
                data.users.push(newUser);
                await writeUsersFile(data);
                return newUser;
            },
            updateUser: async (id, userData) => {
                const data = await readUsersFile();
                const userIndex = data.users.findIndex(u => u.id === id);
                if (userIndex === -1) return null;
                
                data.users[userIndex] = { ...data.users[userIndex], ...userData };
                await writeUsersFile(data);
                return data.users[userIndex];
            },
            deleteUser: async (id) => {
                const data = await readUsersFile();
                const userIndex = data.users.findIndex(u => u.id === id);
                if (userIndex === -1) return false;
                
                data.users.splice(userIndex, 1);
                await writeUsersFile(data);
                return true;
            }
        };
        return db;
    } catch (err) {
        console.error('Error al conectar con el archivo de usuarios:', err);
        throw err;
    }
};

const disconnectDB = async () => {
    console.log('Desconectando de la base de datos');
};

module.exports = { connectDB, disconnectDB };


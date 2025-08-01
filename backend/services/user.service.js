import JsonDB from './jsonDB.service.js';
import bcrypt from 'bcryptjs';

const db = new JsonDB('users');

class UserService {
  async getAll() {
    return await db.getAll('users');
  }

  async getById(id) {
    return await db.getById('users', id);
  }

  async getByEmail(email) {
    return await db.findOne('users', { email });
  }

  async validateCredentials(email, password) {
    const user = await this.getByEmail(email);
    if (!user) {
      console.log('No se encontró usuario con el email:', email);
      return null;
    }
    
    console.log('Usuario encontrado, validando contraseña...');
    console.log('Contraseña almacenada (hash):', user.password ? '***' : 'no definida');
    
    // Como las contraseñas en el JSON están en texto plano, comparamos directamente
    // Si en el futuro se implementa hashing, usar: await bcrypt.compare(password, user.password);
    const isPasswordValid = (user.password === password);
    
    if (!isPasswordValid) {
      console.log('Contraseña incorrecta');
      return null;
    }
    
    console.log('Credenciales válidas para el usuario:', user.email);
    
    // Devolver el usuario sin la contraseña
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async create(userData) {
    // Verificar si el usuario ya existe
    const existingUser = await this.getByEmail(userData.email);
    if (existingUser) {
      throw new Error('El correo electrónico ya está en uso');
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    
    // Crear el usuario
    const newUser = {
      ...userData,
      password: hashedPassword,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    return await db.create('users', newUser);
  }

  async update(id, updates) {
    const user = await this.getById(id);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    // Si se está actualizando el email, verificar que no esté en uso
    if (updates.email && updates.email !== user.email) {
      const existingUser = await this.getByEmail(updates.email);
      if (existingUser) {
        throw new Error('El correo electrónico ya está en uso');
      }
    }

    // Si se está actualizando la contraseña, hashearla
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    updates.updatedAt = new Date().toISOString();
    return await db.update('users', id, updates);
  }

  async delete(id) {
    const user = await this.getById(id);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    return await db.delete('users', id);
  }
}

export default new UserService();

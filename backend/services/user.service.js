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

  async validateCredentials(email, password) {
    const user = await this.getByEmail(email);
    if (!user) {
      return null;
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return null;
    }

    // No devolver la contraseña
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}

export default new UserService();

import express from 'express';
const router = express.Router();
import { connectDB } from '../config/db.js';

// Obtener todos los usuarios
router.get('/', async (req, res, next) => {
    try {
        const db = await connectDB();
        const users = await db.getUsers();
        res.json(users);
    } catch (error) {
        next(error);
    }
});

// Obtener un usuario por ID
router.get('/:id', async (req, res, next) => {
    try {
        const db = await connectDB();
        const user = await db.getUserById(parseInt(req.params.id));
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json(user);
    } catch (error) {
        next(error);
    }
});

// Crear un nuevo usuario
router.post('/', async (req, res, next) => {
    try {
        const { nombre, email, password, rol } = req.body;
        if (!nombre || !email || !password || !rol) {
            return res.status(400).json({ error: 'Faltan campos obligatorios' });
        }

        const db = await connectDB();
        
        // Verificar si el email ya existe
        const existingUser = await db.getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ error: 'El correo electrónico ya está en uso' });
        }

        const newUser = await db.createUser({
            nombre,
            email,
            password, // En una aplicación real, deberías hashear la contraseña
            rol
        });

        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
});

// Actualizar un usuario
router.put('/:id', async (req, res, next) => {
    try {
        const { nombre, email, password, rol } = req.body;
        const userId = parseInt(req.params.id);

        const db = await connectDB();
        const updatedUser = await db.updateUser(userId, {
            ...(nombre && { nombre }),
            ...(email && { email }),
            ...(password && { password }), // En una aplicación real, deberías hashear la contraseña
            ...(rol && { rol })
        });

        if (!updatedUser) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.json(updatedUser);
    } catch (error) {
        next(error);
    }
});

// Eliminar un usuario
router.delete('/:id', async (req, res, next) => {
    try {
        const db = await connectDB();
        const success = await db.deleteUser(parseInt(req.params.id));
        
        if (!success) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

export default router;

import userService from '../../backend/services/user.service.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { email, password } = req.body;
    
    console.log('Intento de inicio de sesión para:', email);
    
    if (!email || !password) {
      console.log('Faltan credenciales');
      return res.status(400).json({ error: 'Email y contraseña son requeridos' });
    }

    const user = await userService.validateCredentials(email, password);
    console.log('Resultado de validación:', user ? 'Éxito' : 'Falló');
    
    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    res.status(200).json({ 
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
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

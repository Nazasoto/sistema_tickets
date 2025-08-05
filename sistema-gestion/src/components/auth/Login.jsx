import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../../services/auth.service';
import './AuthForms.css';

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    console.log('Formulario enviado con:', { 
      email: email || '(vacío)', 
      password: password ? '***' : '(vacío)' 
    });
    
    // Validación básica
    if (!email || !password) {
      const errorMsg = `Faltan credenciales - Email: ${email ? 'presente' : 'faltante'}, Contraseña: ${password ? 'presente' : 'faltante'}`;
      console.error(errorMsg);
      setError('Por favor ingresa tu correo y contraseña');
      return;
    }
    
    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Por favor ingresa un correo electrónico válido');
      return;
    }
    
    setIsLoading(true);

    try {
      console.log('Intentando iniciar sesión...');
      const user = await AuthService.login(email, password);
      console.log('Respuesta del servicio de autenticación:', user);
      
      if (user) {
        console.log('Inicio de sesión exitoso, redirigiendo...');
        onLoginSuccess();
        navigate('/dashboard');
      } else {
        const errorMsg = 'No se pudo iniciar sesión. Por favor, verifica tus credenciales.';
        console.error(errorMsg);
        setError(errorMsg);
      }
    } catch (error) {
      const errorMessage = error.message || 
                         error.response?.data?.message || 
                         'Error al conectar con el servidor. Por favor, inténtalo de nuevo más tarde.';
      console.error('Error en el inicio de sesión:', error);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form-container">
        <h2>Iniciar Sesión</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => {
                console.log('Contraseña cambiada a:', e.target.value ? '***' : '(vacío)');
                setPassword(e.target.value);
              }}
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary btn-block"
            disabled={isLoading}
          >
            {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>
        
        <div className="auth-footer">
          <p>
            ¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link>
          </p>
          <p>
            <Link to="/forgot-password">¿Olvidaste tu contraseña?</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

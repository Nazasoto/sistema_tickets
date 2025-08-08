import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import './AuthForms.css';

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    nombreUsuario: '',
    sucursal: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const schema = Yup.object().shape({
    nombre: Yup.string().required('El nombre es obligatorio'),
    email: Yup.string().email('Email inválido').required('El email es obligatorio'),
    nombreUsuario: Yup.string().required('El nombre de usuario es obligatorio'),
    sucursal: Yup.number()
      .typeError('La sucursal debe ser un número')
      .min(1, 'SUCURSAL NO DISPOBIBLE')
      .max(76, 'SUCURSAL NO DISPONIBLE')
      .required('El número de sucursal es obligatorio'),
    password: Yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres').required('La contraseña es obligatoria'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Las contraseñas no coinciden')
      .required('Debes confirmar la contraseña')
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Opcional: limpiar error del campo al escribir
    setErrors(prev => ({ ...prev, [name]: '' }));

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await schema.validate(formData, { abortEarly: false });

      setErrors({});
      setIsLoading(true);

      // Simular llamada al backend
      setTimeout(() => {
        setIsLoading(false);
        navigate('/login', {
          state: {
            message: '¡Registro exitoso! Por favor inicia sesión.'
          }
        });
      }, 1500);

    } catch (validationError) {
      // Convertir errores de Yup a objeto { campo: mensaje }
      const fieldErrors = {};
      validationError.inner.forEach((err) => {
        fieldErrors[err.path] = err.message;
      });
      setErrors(fieldErrors);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form-container">
        <div className="beta-banner">
          <span className="beta-text">Versión Beta</span>
        </div>

        <h2>SOLICITAR USUARIO</h2>

        {Object.values(errors).length > 0 && (
          <div className="alert alert-danger">
            <ul>
              {Object.values(errors).map((err, i) => (
                <li key={i}>{err}</li>
              ))} 
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="nombre">Nombre Completo</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              className="form-control"
              value={formData.nombre}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="nombreUsuario">Nombre de Usuario</label>
            <input
              type="text"
              id="nombreUsuario"
              name="nombreUsuario"
              className="form-control"
              value={formData.nombreUsuario}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="sucursal">Número de Sucursal</label>
            <input
              type="text" // Usamos "text" para poder filtrar mejor en Yup
              id="sucursal"
              name="sucursal"
              className="form-control"
              value={formData.sucursal}
              onChange={handleChange}
              inputMode="numeric"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar Contraseña</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="form-control"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={isLoading}
          >
            {isLoading ? 'Registrando...' : 'Registrarse'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

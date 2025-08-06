import React, { useState } from 'react';

const ConfiguracionPage = () => {
  const [activeTab, setActiveTab] = useState('perfil');
  const [formData, setFormData] = useState({
    nombre: 'NAZARENO SOTO',
    email: 'soporte@empresa.com',
    telefono: '+543454937293',
    notificaciones: {
      email: true,
      push: true,
    },
    tema: 'claro',
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        notificaciones: {
          ...formData.notificaciones,
          [name]: checked
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Configuración guardada correctamente');
  };

  return (
    <div className="page-container">
      <h2 className="section-title mb-4">Configuración</h2>

      <div className="row">
        <div className="col-md-3">
          <div className="list-group">
            <button 
              className={`list-group-item list-group-item-action ${activeTab === 'perfil' ? 'active' : ''}`}
              onClick={() => setActiveTab('perfil')}
            >
              Perfil
            </button>
            <button 
              className={`list-group-item list-group-item-action ${activeTab === 'notificaciones' ? 'active' : ''}`}
              onClick={() => setActiveTab('notificaciones')}
            >
              Notificaciones
            </button>
            <button 
              className={`list-group-item list-group-item-action ${activeTab === 'seguridad' ? 'active' : ''}`}
              onClick={() => setActiveTab('seguridad')}
            >
              Seguridad
            </button>
          </div>
        </div>

        <div className="col-md-9">
          <div className="card">
            <div className="card-body">
              {activeTab === 'perfil' && (
                <form onSubmit={handleSubmit}>
                  <h5>Información del Perfil</h5>
                  <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input 
                      type="email" 
                      className="form-control" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Teléfono</label>
                    <input 
                      type="tel" 
                      className="form-control" 
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleInputChange}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Guardar Cambios
                  </button>
                </form>
              )}

              {activeTab === 'notificaciones' && (
                <form onSubmit={handleSubmit}>
                  <h5>Notificaciones</h5>
                  <div className="form-check form-switch mb-3">
                    <input 
                      type="checkbox" 
                      className="form-check-input" 
                      name="email"
                      checked={formData.notificaciones.email}
                      onChange={handleInputChange}
                    />
                    <label className="form-check-label">Notificaciones por email</label>
                  </div>
                  <div className="form-check form-switch mb-3">
                    <input 
                      type="checkbox" 
                      className="form-check-input" 
                      name="push"
                      checked={formData.notificaciones.push}
                      onChange={handleInputChange}
                    />
                    <label className="form-check-label">Notificaciones push</label>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Guardar Preferencias
                  </button>
                </form>
              )}

              {activeTab === 'seguridad' && (
                <div>
                  <h5>Cambiar Contraseña</h5>
                  <div className="mb-3">
                    <label className="form-label">Contraseña Actual</label>
                    <input type="password" className="form-control" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Nueva Contraseña</label>
                    <input type="password" className="form-control" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Confirmar Nueva Contraseña</label>
                    <input type="password" className="form-control" />
                  </div>
                  <button className="btn btn-primary">
                    Cambiar Contraseña
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfiguracionPage;

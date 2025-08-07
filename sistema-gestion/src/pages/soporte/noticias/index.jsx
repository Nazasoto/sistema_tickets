import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './noticias.css'
import { getNoticias as fetchNoticias, crearNoticia, borrarNoticia, archivarNoticia } from '../../../api/noticiasApi';

// Utilidad para obtener el rol del usuario
const getUserRole = () => localStorage.getItem('userRole') || 'soporte';

// Mock inicial de noticias (en memoria)
const NoticiasPage = () => {
  const [noticias, setNoticias] = useState([]);
  const [nuevaNoticia, setNuevaNoticia] = useState({ titulo: '', descripcion: '', imagen: '', archivo: null, archivoNombre: '', links: '' });
  const [showForm, setShowForm] = useState(false);
  const [detalle, setDetalle] = useState(null);
  const navigate = useNavigate();
  const rol = getUserRole();

  // Crear noticia (solo admin/soporte)
  const handleCrear = async (e) => {
    e.preventDefault();
    if (!nuevaNoticia.titulo || !nuevaNoticia.descripcion) return;
    const nueva = {
      ...nuevaNoticia,
      autor: rol,
      fecha: new Date().toISOString().slice(0, 10),
      links: nuevaNoticia.links ? nuevaNoticia.links.split(',').map(l => l.trim()) : [],
      archivada: false
    };
    await crearNoticia(nueva);
    cargarNoticias();
    setNuevaNoticia({ titulo: '', descripcion: '', imagen: '', archivo: null, archivoNombre: '', links: '' });
    setShowForm(false);
  };

  // Cargar noticias del backend
  const cargarNoticias = async () => {
    const data = await fetchNoticias();
    setNoticias(data);
  };

  useEffect(() => {
    cargarNoticias();
    // eslint-disable-next-line
  }, []);

  // Borrar noticia (solo admin/soporte)
  const handleBorrar = async (id) => {
    await borrarNoticia(id);
    cargarNoticias();
    setDetalle(null);
  };

  // Archivar noticia (solo sucursal)
  const handleArchivar = async (id) => {
    await archivarNoticia(id);
    cargarNoticias();
    setDetalle(null);
  };

  // Mostrar detalle
  const verDetalle = (noticia) => setDetalle(noticia);

  // Render
  return (
    <div className="noticias-page">
      <h2>Noticias</h2>
      {/* Formulario de creación (solo soporte y admin) */}
      {(rol === 'soporte' || rol === 'admin') && (
        <>
          <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancelar' : 'Crear Noticia'}
          </button>
          {showForm && (
            <form className="noticia-form" onSubmit={handleCrear}>
              <label>Título</label>
              <input
                type="text"
                placeholder="Título"
                value={nuevaNoticia.titulo}
                onChange={e => setNuevaNoticia({ ...nuevaNoticia, titulo: e.target.value })}
                required
              />
              <label>Descripción</label>
              <textarea
                placeholder="Descripción"
                value={nuevaNoticia.descripcion}
                onChange={e => setNuevaNoticia({ ...nuevaNoticia, descripcion: e.target.value })}
                required
              />
              <label>Links (separados por coma)</label>
              <input
                type="text"
                placeholder="Links (separados por coma)"
                value={nuevaNoticia.links}
                onChange={e => setNuevaNoticia({ ...nuevaNoticia, links: e.target.value })}
              />
              <label>Imagen (subir archivo o pegar URL)</label>
              <input
                type="file"
                accept="image/*"
                onChange={e => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setNuevaNoticia(n => ({ ...n, imagen: reader.result }));
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
              <input
                type="text"
                placeholder="URL de imagen (opcional)"
                value={nuevaNoticia.imagen && nuevaNoticia.imagen.startsWith('data:') ? '' : nuevaNoticia.imagen}
                onChange={e => setNuevaNoticia({ ...nuevaNoticia, imagen: e.target.value })}
              />
              <label>Archivo adjunto (opcional)</label>
              <input
                type="file"
                onChange={e => {
                  const file = e.target.files[0];
                  setNuevaNoticia(n => ({ ...n, archivo: file || null, archivoNombre: file ? file.name : '' }));
                }}
              />
              {nuevaNoticia.archivoNombre && <span style={{fontSize:'0.93em',color:'#555'}}>Archivo: {nuevaNoticia.archivoNombre}</span>}
              <button type="submit" className="btn btn-success">Publicar</button>
            </form>
          )}
        </>
      )}

      {/* Lista de noticias */}
      <div className="noticias-list">
        {noticias.length === 0 && <p>No hay noticias.</p>}
        {noticias.filter(n => !n.archivada || rol !== 'sucursal').map(noticia => (
          <div key={noticia.id} className="noticia-card" onClick={() => verDetalle(noticia)}>
            <h4>{noticia.titulo}</h4>
            <span className="noticia-meta">{noticia.fecha} · {noticia.autor}</span>
            {noticia.imagen && <img src={noticia.imagen} className="noticia-thumb" alt="miniatura" />}
          </div>
        ))}
      </div>

      {/* Detalle de noticia */}
      {detalle && (
        <div className="noticia-detalle-modal">
          <div className="noticia-detalle">
            <button className="close-btn" onClick={() => setDetalle(null)}>×</button>
            <h3>{detalle.titulo}</h3>
            <p>{detalle.descripcion}</p>
            {detalle.imagen && <img src={detalle.imagen} alt="" className="noticia-img" />}
            {detalle.links && detalle.links.length > 0 && (
              <div className="noticia-links">
                <strong>Links:</strong>
                <ul>
                  {detalle.links.map((l, i) => <li key={i}><a href={l} target="_blank" rel="noopener noreferrer">{l}</a></li>)}
                </ul>
              </div>
            )}
            <div className="noticia-actions">
              {(rol === 'soporte' || rol === 'admin') && (
                <button className="btn btn-danger" onClick={() => handleBorrar(detalle.id)}>Borrar</button>
              )}
              {rol === 'sucursal' && !detalle.archivada && (
                <button className="btn btn-secondary" onClick={() => handleArchivar(detalle.id)}>Archivar</button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoticiasPage;

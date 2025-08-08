import React, { useState, useEffect } from 'react';
import './noticias.css';
import { getNoticias as fetchNoticias, archivarNoticia } from '../../api/noticiasApi';

// Utilidad para obtener el rol del usuario
const getUserRole = () => localStorage.getItem('userRole') || 'sucursal';

// Obtener noticias globales desde localStorage (mock temporal)
const getNoticias = () => {
  const raw = localStorage.getItem('noticiasGlobales');
  return raw ? JSON.parse(raw) : [];
};

const SucursalNotificacionesPage = () => {
  const [noticias, setNoticias] = useState([]);
  const [detalle, setDetalle] = useState(null);
  const rol = getUserRole();

  // Cargar noticias del backend
  const cargarNoticias = async () => {
    try {
      const data = await fetchNoticias();
      setNoticias(data.filter(n => !n.archivada));
    } catch (e) {
      setNoticias([]);
    }
  };

  useEffect(() => {
    cargarNoticias();
    // eslint-disable-next-line
  }, []);

  // Volver a la pagina anterior
  const handleVolver = () => {
    window.history.back();
  };

  // Recargar noticias manualmente
  const recargarNoticias = cargarNoticias;

  // Archivar noticia
  const handleArchivar = async (id) => {
    await archivarNoticia(id);
    cargarNoticias();
    setDetalle(null);
  };

  return (
    <div className="noticias-page">
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:8}}>
        <h2 style={{margin:0}}>Notificaciones</h2>
        <button className="btn btn-secondary" onClick={recargarNoticias} style={{height:32}}>Actualizar</button>
        <button className="btn btn-secondary" onClick={handleVolver} style={{height:32}}>Volver</button>
      </div>
      {noticias.length === 0 && <p>No hay notificaciones nuevas.</p>}
      <div className="noticias-list">
        {noticias.map(noticia => (
          <div className="noticia-card" key={noticia.id} onClick={() => setDetalle(noticia)}>
            {noticia.imagen && <img src={noticia.imagen} className="noticia-thumb" alt="miniatura" />}
            <div>
              <h4>{noticia.titulo}</h4>
              <span className="noticia-meta">{noticia.fecha} - {noticia.autor}</span>
            </div>
          </div>
        ))}
      </div>
      {detalle && (
        <div className="noticia-detalle-modal" onClick={() => setDetalle(null)}>
          <div className="noticia-detalle" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setDetalle(null)}>&times;</button>
            <h3>{detalle.titulo}</h3>
            <span className="noticia-meta">{detalle.fecha} - {detalle.autor}</span>
            {detalle.imagen && <img src={detalle.imagen} className="noticia-img" alt="imagen" />}
            <p>{detalle.descripcion}</p>
            {detalle.links && detalle.links.length > 0 && (
              <div className="noticia-links">
                <strong>Links:</strong>
                <ul>
                  {detalle.links.map((l, i) => <li key={i}><a href={l} target="_blank" rel="noopener noreferrer">{l}</a></li>)}
                </ul>
              </div>
            )}
            {detalle.archivoNombre && (
              <div style={{marginTop:'10px'}}>
                <strong>Archivo adjunto:</strong> {detalle.archivoNombre}
              </div>
            )}
            <div className="noticia-actions">
              <button className="btn btn-secondary" onClick={() => setDetalle(null)}>Cerrar</button>
              <button className="btn btn-danger" onClick={() => handleArchivar(detalle.id)}>Archivar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SucursalNotificacionesPage;

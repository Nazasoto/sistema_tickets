import React, { useState, useEffect } from 'react';
import './noticias.css';

// Utilidad para obtener el rol del usuario
const getUserRole = () => localStorage.getItem('userRole') || 'sucursal';

// Obtener noticias globales desde localStorage (mock temporal)
const getNoticias = () => {
  const raw = localStorage.getItem('noticiasGlobales');
  return raw ? JSON.parse(raw) : [];
};

const SucursalNoticiasPage = () => {
  const [noticias, setNoticias] = useState([]);
  const [detalle, setDetalle] = useState(null);
  const rol = getUserRole();

  useEffect(() => {
    setNoticias(getNoticias().filter(n => !n.archivada));
  }, []);

  // Archivar noticia
  const handleArchivar = id => {
    const nuevas = getNoticias().map(n => n.id === id ? { ...n, archivada: true } : n);
    localStorage.setItem('noticiasGlobales', JSON.stringify(nuevas));
    setNoticias(nuevas.filter(n => !n.archivada));
    setDetalle(null);
  };

  return (
    <div className="noticias-page">
      <h2>Noticias</h2>
      {noticias.length === 0 && <p>No hay noticias nuevas.</p>}
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

export default SucursalNoticiasPage;

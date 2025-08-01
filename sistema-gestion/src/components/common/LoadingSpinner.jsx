import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner-overlay">
      <div className="loading-spinner"></div>
      <p>Cargando...</p>
    </div>
  );
};

export default LoadingSpinner;

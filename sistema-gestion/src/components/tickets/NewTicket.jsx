import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TicketService } from '../../services/ticket.service';
import { FileService } from '../../services/file.service';
import './NewTicket.css';

const ticketSchema = yup.object({
  nombre: yup.string()
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/, 'Solo letras y espacios permitidos')
    .required('El nombre es requerido'),
  segundoNombre: yup.string()
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]*$/, 'Solo letras y espacios permitidos')
    .notRequired(),
  apellido: yup.string()
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/, 'Solo letras y espacios permitidos')
    .required('El apellido es requerido'),
  sucursal: yup.string().required('La sucursal es requerida'),
  ciudad: yup.string().required('La ciudad es requerida'),
  correo: yup.string()
    .email('Correo inválido')
    .matches(/@palmares$/, 'El correo debe ser de dominio @palmares')
    .required('El correo es requerido'),
  telefono: yup.string()
    .matches(/^\+?\d{7,15}$/, 'Número de teléfono inválido')
    .required('El teléfono es requerido'),
  detalleProblema: yup.string().required('El detalle del problema es requerido'),
  indicaciones: yup.string().notRequired(),
  urgencia: yup.string().oneOf(['baja', 'media', 'alta', 'urgente']).required('La urgencia es requerida'),
  medioContacto: yup.string()
    .oneOf(['telefono', 'team', 'whatsapp', 'mail', 'otro'])
    .required('El medio de contacto es requerido'),
  contacto: yup.string().required('El contacto alternativo es requerido'),
  archivos: yup.array().of(yup.object()).notRequired(),
});

const NewTicket = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [files, setFiles] = useState([]);
  const [fileError, setFileError] = useState(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(ticketSchema)
  });

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    const maxSize = 10 * 1024 * 1024; // 10MB por archivo
    const invalidFiles = selectedFiles.filter(file => file.size > maxSize);

    if (invalidFiles.length > 0) {
      setFileError('Los archivos no pueden superar 10MB cada uno');
      return;
    }

    const allowedTypes = [
      'application/pdf', 
      'application/msword', 
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/jpeg', 
      'image/png', 
      'image/gif', 
      'text/plain', 
      'text/csv',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 
      'application/vnd.ms-excel'
    ];

    const invalidTypes = selectedFiles.filter(file => !allowedTypes.includes(file.type));
    if (invalidTypes.length > 0) {
      setFileError('Tipos de archivo no permitidos. Solo PDF, DOC, DOCX, JPG, PNG, GIF, TXT, CSV, XLSX, XLS');
      return;
    }

    setFileError(null);
    setFiles(selectedFiles);
  };

  const removeFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setError(null);

      const ticketData = {
        ...data,
        fechaHora: new Date().toISOString(),
      };

      if (files.length > 0) {
        try {
          const uploadedFiles = await FileService.uploadFiles(files);
          ticketData.archivos = uploadedFiles.map(file => file.url);
        } catch (uploadError) {
          setError('Error subiendo archivos. Por favor, intente nuevamente.');
          setLoading(false);
          return;
        }
      }

      await TicketService.createTicket(ticketData);

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);

      reset();
      setFiles([]);
    } catch (submitError) {
      setError('Error al crear el ticket. Por favor, intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    reset();
    setFiles([]);
    setError(null);
    setSuccess(false);
    setFileError(null);
  };

  return (
    <div className="new-ticket-container">
      {success && <div className="success-message">Ticket creado exitosamente!</div>}
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit(onSubmit)} className="ticket-form">

        {/* --- Aquí los campos igual que antes --- */}

        <div className="form-section">
          <h3>Datos del Solicitante</h3>
          <div className="form-group">
            <label htmlFor="nombre">Nombre *</label>
            <input id="nombre" {...register('nombre')} type="text" placeholder="Nombre" />
            {errors.nombre && <p className="error-text">{errors.nombre.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="segundoNombre">Segundo Nombre (opcional)</label>
            <input id="segundoNombre" {...register('segundoNombre')} type="text" placeholder="Segundo nombre" />
            {errors.segundoNombre && <p className="error-text">{errors.segundoNombre.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="apellido">Apellido *</label>
            <input id="apellido" {...register('apellido')} type="text" placeholder="Apellido" />
            {errors.apellido && <p className="error-text">{errors.apellido.message}</p>}
          </div>
        </div>

        <div className="form-section">
          <h3>Ubicación</h3>
          <div className="form-group">
            <label htmlFor="sucursal">Sucursal *</label>
            <input id="sucursal" {...register('sucursal')} type="text" placeholder="Sucursal" />
            {errors.sucursal && <p className="error-text">{errors.sucursal.message}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="ciudad">Ciudad *</label>
            <input id="ciudad" {...register('ciudad')} type="text" placeholder="Ciudad" />
            {errors.ciudad && <p className="error-text">{errors.ciudad.message}</p>}
          </div>
        </div>

        <div className="form-section">
          <h3>Contacto</h3>
          <div className="form-group">
            <label htmlFor="correo">Correo Electrónico *</label>
            <input id="correo" {...register('correo')} type="email" placeholder="correo@palmares" />
            {errors.correo && <p className="error-text">{errors.correo.message}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="telefono">Teléfono *</label>
            <input id="telefono" {...register('telefono')} type="tel" placeholder="+549..." />
            {errors.telefono && <p className="error-text">{errors.telefono.message}</p>}
          </div>
        </div>

        <div className="form-section">
          <h3>Detalle del Problema</h3>
          <div className="form-group">
            <label htmlFor="detalleProblema">Descripción *</label>
            <textarea id="detalleProblema" {...register('detalleProblema')} placeholder="Detalle pormenorizado del problema..." />
            {errors.detalleProblema && <p className="error-text">{errors.detalleProblema.message}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="indicaciones">Indicaciones (opcional)</label>
            <textarea id="indicaciones" {...register('indicaciones')} placeholder="Indicaciones adicionales..." />
            {errors.indicaciones && <p className="error-text">{errors.indicaciones.message}</p>}
          </div>
        </div>

        <div className="form-section">
          <h3>Prioridad y Contacto</h3>
          <div className="form-group">
            <label htmlFor="urgencia">Urgencia *</label>
            <select id="urgencia" {...register('urgencia')}>
              <option value="">Seleccionar urgencia</option>
              <option value="baja">Baja</option>
              <option value="media">Media</option>
              <option value="alta">Alta</option>
              <option value="urgente">Urgente</option>
            </select>
            {errors.urgencia && <p className="error-text">{errors.urgencia.message}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="medioContacto">Medio de Contacto *</label>
            <select id="medioContacto" {...register('medioContacto')}>
              <option value="">Seleccionar medio</option>
              <option value="telefono">Teléfono</option>
              <option value="team">Team</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="mail">Mail</option>
              <option value="otro">Otro</option>
            </select>
            {errors.medioContacto && <p className="error-text">{errors.medioContacto.message}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="contacto">Contacto Alternativo *</label>
            <input id="contacto" {...register('contacto')} type="text" placeholder="Nombre, teléfono o email" />
            {errors.contacto && <p className="error-text">{errors.contacto.message}</p>}
          </div>
        </div>

        <div className="form-section">
          <h3>Archivos Adjuntos (Opcional)</h3>
          <div className="file-upload-container">
            <input
              type="file"
              multiple
              id="archivos"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.txt,.csv,.xlsx,.xls"
            />
            {fileError && <p className="error-text">{fileError}</p>}

            {files.length > 0 && (
              <div className="selected-files">
                {files.map((file, index) => (
                  <div key={index} className="file-item">
                    <span className="file-name">{file.name}</span>
                    <button
                      type="button"
                      className="remove-btn"
                      onClick={() => removeFile(index)}
                      aria-label={`Eliminar archivo ${file.name}`}
                    >
                      Eliminar
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="button-group">
          <button type="submit" disabled={loading}>
            {loading ? 'Creando...' : 'Crear Ticket'}
          </button>
          <button
            type="button"
            className="cancel-button"
            onClick={handleCancel}
            disabled={loading}
          >
            Cancelar
          </button>
        </div>

      </form>
    </div>
  );
};

export default NewTicket;

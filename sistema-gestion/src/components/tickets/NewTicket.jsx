import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TicketService } from '../../services/ticket.service';
import { FileService } from '../../services/file.service';
import './NewTicket.css';
import { useNavigate } from 'react-router-dom';


 {/* --- Validaciones --- */}
const ticketSchema = yup.object({
  // --- Campos obligatorios ---
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
    .matches(/@palmaresltd.com.ar$/, 'El correo debe ser de dominio @palmaresltd.com.ar')
    .required('El correo es requerido'),
  telefono: yup.string()
    .matches(/^\+?\d{7,15}$/, 'Número de teléfono inválido')
    .required('El teléfono es requerido'),
  asunto: yup.string().required('El asunto es requerido'),
  detalleProblema: yup.string().required('El detalle del problema es requerido'),
  urgencia: yup.string()
    .oneOf(['baja', 'media', 'alta', 'urgente'], 'Selecciona un nivel de urgencia válido')
    .required('La urgencia es requerida'),
});




{/* --- Componente --- */}
const NewTicket = () => {
  {/* --- Estados --- */}
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [files, setFiles] = useState([]);
  const [fileError, setFileError] = useState(null);
  const navigate = useNavigate();

  {/* --- Formulario --- */}
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(ticketSchema)
  });

  {/* --- Manejo de archivos --- */}
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    const maxSize = 10 * 1024 * 1024; // 10MB por archivo
    const invalidFiles = selectedFiles.filter(file => file.size > maxSize);
 
    {/* --- Validación de archivos --- */}
    if (invalidFiles.length > 0) {
      setFileError('Los archivos no pueden superar 10MB cada uno');
      return;
    }

    {/* --- Validación de tipos de archivos --- */}
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

  {/* --- Manejo de archivos --- */}
  const removeFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  {/* --- Manejo de envio --- */}
  const onSubmit = async (data) => {
    console.log('Iniciando envío del formulario...');
    console.log('Datos del formulario:', data);
    
    try {
      setLoading(true);
      setError(null);

      const now = new Date().toISOString();
      
      // Preparar los datos del ticket según lo que espera el backend
      const ticketData = {
        nombre: data.nombre,
        segundoNombre: data.segundoNombre || '',
        apellido: data.apellido,
        sucursal: data.sucursal,
        ciudad: data.ciudad,
        correo: data.correo,
        telefono: data.telefono,
        contacto: data.correo, // Usamos el correo como contacto
        titulo: data.asunto, // Mapeamos asunto a titulo para el backend
        descripcion: data.detalleProblema,
        urgencia: data.urgencia,
        estado: 'abierto',
        fechaHora: now,
        fechaCreacion: now,
        fechaActualizacion: now
      };

      console.log('Datos del ticket a enviar:', ticketData);

      // Procesar archivos si los hay
      if (files.length > 0) {
        console.log('Procesando archivos adjuntos...');
        try {
          const uploadedFiles = await FileService.uploadFiles(files);
          console.log('Archivos subidos:', uploadedFiles);
          ticketData.archivos = uploadedFiles.map(file => file.url);
        } catch (uploadError) {
          console.error('Error subiendo archivos:', uploadError);
          setError('Error subiendo archivos. El ticket se creará sin archivos adjuntos.');
          // Continuamos con el envío del ticket sin los archivos
        }
      }

      console.log('Enviando ticket al servidor...');
      const response = await TicketService.createTicket(ticketData);
      console.log('Respuesta del servidor:', response);

      setSuccess(true);
      console.log('Ticket creado exitosamente');
      
      // Redirigir después de 2 segundos
      setTimeout(() => {
        navigate('/tickets'); // Redirigir al listado de tickets
      }, 2000);

      reset();
      setFiles([]);
    } catch (submitError) {
      console.error('Error al crear el ticket:', submitError);
      const errorMessage = submitError.response?.data?.message || 
                         submitError.message || 
                         'Error al crear el ticket. Por favor, intente nuevamente.';
      setError(errorMessage);
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
    navigate('/dashboard'); // Redirige al dashboar
  };

  {/* --- Renderizado --- */}
  return (
    <div className="new-tickdet-container">
      {success && <div className="success-message">Ticket creado exitosamente!</div>}
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit(onSubmit)} className="ticket-form">
        {/* --- Campos para el detalle del problema --- */}
        <div className="form-section">
          <h3>Detalle del Problema</h3>
          <div className="form-group">
            <label htmlFor="asunto">Asunto *</label>
            <input type="text" id="asunto" {...register('asunto')} placeholder="Ejemplo: Se me rompió la impresora..." />
            {errors.asunto && <p className="error-text">{errors.asunto.message}</p>}
          </div>
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


        {/* --- Campos para la prioridad --- */}
        <div className="form-section">
          <h3>Prioridad</h3>
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
          <button type="submit" disabled={loading} onClick={() => console.log("creado")}>
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

# Sistema de Gestión de Tickets

## Tabla de Contenidos

- [Descripción General](#descripción-general)
- [Características Principales](#características-principales)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Configuración del Entorno](#configuración-del-entorno)
- [Instalación](#instalación)
- [Uso](#uso)
- [API Documentation](#api-documentation)
- [Despliegue](#despliegue)
- [Contribución](#contribución)
- [Licencia](#licencia)

## Descripción General

Sistema de Gestión de Tickets es una aplicación web completa diseñada para gestionar y hacer seguimiento de tickets de soporte. Permite a los usuarios reportar problemas, realizar seguimiento de su estado y comunicarse con el equipo de soporte de manera eficiente.

## Características Principales

- **Autenticación de Usuarios**
  - Registro e inicio de sesión seguro
  - Recuperación de contraseña
  - Perfiles de usuario personalizables

- **Gestión de Tickets**
  - Creación y seguimiento de tickets
  - Asignación de prioridades y categorías
  - Adjuntar archivos a los tickets
  - Historial de cambios

- **Panel de Control**
  - Vista general de estadísticas
  - Filtros avanzados
  - Exportación de informes

- **Notificaciones**
  - Notificaciones en tiempo real
  - Notificaciones por correo electrónico
  - Preferencias de notificación personalizables

## Tecnologías Utilizadas

### Frontend
- React 19.1.0
- React Router DOM 7.7.1
- Vite 7.0.4
- Axios para peticiones HTTP
- Context API para gestión de estado global
- CSS Modules para estilos modulares

### Backend
- Node.js 18+
- Express.js
- MongoDB con Mongoose
- JWT para autenticación
- Bcrypt para hashing de contraseñas
- Winston para logging

### Herramientas de Desarrollo
- ESLint para análisis de código
- Prettier para formato de código
- Git para control de versiones
- Postman para pruebas de API

## Estructura del Proyecto

```
sistema_tickets/
├── backend/                 # Backend del sistema
│   ├── config/             # Configuraciones
│   │   └── db.js           # Configuración de la base de datos
│   ├── controllers/         # Controladores de la API
│   │   ├── authController.js
│   │   ├── ticketController.js
│   │   └── userController.js
│   ├── middleware/         # Middleware personalizados
│   │   └── auth.js         # Middleware de autenticación
│   ├── models/             # Modelos de MongoDB
│   │   ├── Ticket.js
│   │   └── User.js
│   ├── routes/             # Rutas de la API
│   │   ├── auth.js
│   │   ├── tickets.js
│   │   └── users.js
│   ├── utils/              # Utilidades
│   │   └── logger.js       # Configuración de logs
│   └── server.js           # Punto de entrada del servidor
│
├── sistema-gestion/        # Frontend del sistema
│   ├── public/             # Archivos estáticos
│   └── src/
│       ├── assets/         # Recursos estáticos
│       ├── components/     # Componentes reutilizables
│       │   ├── auth/       # Componentes de autenticación
│       │   ├── common/     # Componentes comunes
│       │   ├── dashboard/  # Componentes del dashboard
│       │   └── tickets/    # Componentes de tickets
│       ├── config/         # Configuraciones
│       │   └── api.js      # Configuración de la API
│       ├── context/        # Contextos de React
│       ├── hooks/          # Custom hooks
│       ├── layouts/        # Layouts de la aplicación
│       ├── pages/          # Páginas de la aplicación
│       ├── services/       # Servicios de la aplicación
│       │   ├── api.service.js
│       │   ├── auth.service.js
│       │   └── ticket.service.js
│       ├── styles/         # Estilos globales
│       ├── utils/          # Utilidades
│       ├── App.jsx         # Componente principal
│       └── main.jsx        # Punto de entrada
│
└── DOCS/                   # Documentación
    └── README.md           # Este archivo
```

## Configuración del Entorno

### Variables de Entorno

Crea un archivo `.env` en la raíz del backend con las siguientes variables:

```env
# Puerto del servidor
PORT=5000

# Configuración de MongoDB
MONGODB_URI=mongodb://localhost:27017/tickets_db

# JWT
JWT_SECRET=tu_clave_secreta_jwt
JWT_EXPIRES_IN=30d

# Configuración de correo (opcional)
SMTP_HOST=smtp.ejemplo.com
SMTP_PORT=587
SMTP_USER=usuario@ejemplo.com
SMTP_PASS=tu_contraseña
```

## Instalación

### Requisitos Previos

- Node.js 18 o superior
- MongoDB 6.0 o superior
- npm 9.0 o superior

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/sistema-gestion-tickets.git
   cd sistema-gestion-tickets
   ```

2. **Instalar dependencias del backend**
   ```bash
   cd backend
   npm install
   ```

3. **Instalar dependencias del frontend**
   ```bash
   cd ../sistema-gestion
   npm install
   ```

4. **Iniciar la base de datos**
   Asegúrate de tener MongoDB en ejecución localmente o configura la conexión en el archivo `.env`.

## Uso

### Desarrollo

1. **Iniciar el servidor de desarrollo del backend**
   ```bash
   cd backend
   npm run dev
   ```

2. **Iniciar el servidor de desarrollo del frontend**
   ```bash
   cd ../sistema-gestion
   npm run dev
   ```

3. **Acceder a la aplicación**
   Abre tu navegador en [http://localhost:5173](http://localhost:5173)

### Producción

1. **Construir la aplicación para producción**
   ```bash
   cd sistema-gestion
   npm run build
   ```

2. **Iniciar el servidor en producción**
   ```bash
   npm run preview
   ```

## API Documentation

La documentación completa de la API está disponible en `/api-docs` cuando el servidor está en ejecución.

### Autenticación

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "usuario@ejemplo.com",
  "password": "contraseña123"
}
```

### Tickets

#### Obtener todos los tickets
```http
GET /api/tickets
Authorization: Bearer <token>
```

#### Crear un nuevo ticket
```http
POST /api/tickets
Authorization: Bearer <token>
Content-Type: application/json

{
  "titulo": "Problema con el sistema de facturación",
  "descripcion": "No puedo generar facturas desde ayer.",
  "prioridad": "alta",
  "categoria": "facturacion"
}
```

## Despliegue

### Docker

El proyecto incluye un archivo `docker-compose.yml` para facilitar el despliegue:

```bash
docker-compose up -d
```

### Plataformas en la Nube

El sistema puede ser desplegado en:
- Heroku
- AWS Elastic Beanstalk
- Google Cloud Run
- Microsoft Azure App Service

## Contribución

1. Haz un fork del proyecto
2. Crea una rama para tu característica (`git checkout -b feature/nueva-caracteristica`)
3. Haz commit de tus cambios (`git commit -am 'Añadir nueva característica'`)
4. Haz push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

### Protección de Rutas

El middleware de autenticación verifica:
- Token válido en cada petición
- Rol adecuado para cada endpoint
- Estado de sesión activa

### Seguridad Adicional

- Hashing de contraseñas con bcrypt
- Validación de roles
- Protección contra XSS y CSRF
- Rate limiting en endpoints críticos
- Logging de intentos fallidos de acceso

## Contribución

Para contribuir al proyecto:
1. Fork del repositorio
2. Crear una rama para tu feature
3. Hacer commit de tus cambios
4. Push a la rama
5. Crear Pull Request

---

**Nota:** Este documento es una versión inicial y puede ser actualizado según el desarrollo del proyecto.

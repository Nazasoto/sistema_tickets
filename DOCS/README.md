# Sistema de Gestión de Tickets

## Tabla de Contenidos

- [Descripción General](#descripción-general)
- [Características Principales](#características-principales)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Configuración del Entorno](#configuración-del-entorno)
- [Instalación](#instalación)
- [Uso](#uso)
- [Documentación de la API](#documentación-de-la-api)
- [Roles de Usuario](#roles-de-usuario)
- [Despliegue](#despliegue)
- [Contribución](#contribución)

## Descripción General

Sistema de Gestión de Tickets es una aplicación web completa diseñada para la gestión interna de tickets de soporte técnico. Permite a los usuarios reportar incidencias, realizar seguimiento de su estado y comunicarse con el equipo de soporte de manera eficiente. La aplicación está diseñada para ser utilizada por diferentes tipos de usuarios con distintos niveles de acceso.

## Características Principales

- **Autenticación de usuarios** con diferentes roles (Administrador, Soporte, Sucursal)
- **Gestión de tickets** con seguimiento de estado
- **Panel de administración** para gestión de usuarios y configuración
- **Interfaz intuitiva** y responsiva
- **Sistema de notificaciones** en tiempo real
- **Base de datos local** con almacenamiento en archivos JSON
- **API RESTful** para integración con otros sistemas
- **Seguridad mejorada** con manejo de sesiones

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
│   ├── data/               # Archivos JSON de la base de datos
│   │   ├── tickets.json    # Datos de tickets
│   │   └── users.json      # Datos de usuarios
│   ├── services/           # Servicios de la aplicación
│   │   ├── jsonDB.service.js # Servicio de base de datos JSON
│   │   ├── ticket.service.js # Lógica de negocio de tickets
│   │   └── user.service.js  # Lógica de negocio de usuarios
│   └── server.js           # Punto de entrada del servidor
│
├── sistema-gestion/        # Frontend del sistema
│   ├── public/             # Archivos estáticos
│   └── src/
│       ├── assets/         # Recursos estáticos (imágenes, fuentes, etc.)
│       ├── components/     # Componentes reutilizables
│       │   ├── auth/       # Componentes de autenticación
│       │   ├── common/     # Componentes comunes (botones, inputs, etc.)
│       │   ├── dashboard/  # Componentes del dashboard
│       │   └── tickets/    # Componentes de tickets
│       ├── config/         # Configuraciones
│       │   └── config.js   # Configuración de la aplicación
│       ├── context/        # Contextos de React
│       ├── pages/          # Páginas de la aplicación
│       │   ├── Login/      # Página de inicio de sesión
│       │   ├── Dashboard/  # Panel principal
│       │   └── Tickets/    # Gestión de tickets
│       ├── services/       # Servicios de la aplicación
│       │   ├── api.service.js  # Cliente HTTP
│       │   └── auth.service.js # Servicio de autenticación
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
<<<<<<< HEAD
=======
sistema-gestion/
├── public/          # Archivos estáticos
├── src/             # Código fuente
│   ├── components/   # Componentes React
│   │   ├── login.css # Estilos del componente de login
│   │   └── main.css  # Estilos globales
│   ├── index.html   # Punto de entrada HTML
└── vite.config.js   # Configuración de Vite
```

### Tecnologías Principales

- React 19.1.0
- React Router DOM 7.7.1
- Vite 7.0.4
- TypeScript (configurado)
- ESLint para validación de código

### Componentes Principales

#### Login Component
- Sistema de autenticación
- Integración con backend
- Manejo de estados de autenticación
- Diseño responsive
- Validación de formularios

#### Admin Panel
- Dashboard con saludo personalizado
- Navegación con barra lateral
- Secciones: Usuarios, Movimientos, Reportes y Configuración
- Contenedor de estado de sucursales
- Diseño moderno y responsive

#### Rutas
- React Router para manejo de navegación
- Protección de rutas según roles de usuario
- Navegación segura entre secciones

### Estilos

- CSS puro con archivos separados
- Organización modular de estilos
- Estilos globales en main.css
- Estilos componentes específicos en archivos separados
- Diseño responsive para dispositivos móviles
- Sistema de colores consistente
- Animaciones y transiciones suaves

### Scripts de Desarrollo

```bash
# Desarrollo
npm run dev

# Construcción
npm run build

# Previsualización
npm run preview

# Linting
npm run lint
```

## Requisitos del Sistema

### Backend
- Node.js 16+
- npm o yarn

### Frontend
- Navegador moderno
- Internet Explorer no soportado
>>>>>>> 32790c65eb6f51e95eed2dfa2f04f809e849a18c

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

<<<<<<< HEAD
2. **Iniciar el servidor en producción**
   ```bash
   npm run preview
   ```
=======
1. **Admin**
   - Acceso completo al sistema
   - Puede crear y gestionar usuarios
   - Puede ver y modificar todos los tickets
   - Puede configurar permisos y roles
   - Puede ver reportes y estadísticas
   - Tiene acceso a historial mensual de actividades
   - Puede gestionar configuraciones del sistema
   - Puede ver estado de sucursales activas
>>>>>>> 32790c65eb6f51e95eed2dfa2f04f809e849a18c

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

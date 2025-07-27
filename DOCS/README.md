# Sistema de Gestión de Tickets

## Índice

- [Descripción General](#descripción-general)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Backend](#backend)
  - [Configuración](#configuración)
  - [Autenticación](#autenticación)
  - [Base de Datos](#base-de-datos)
  - [API Endpoints](#api-endpoints)
- [Frontend](#frontend)
  - [Estructura](#estructura)
  - [Componentes Principales](#componentes-principales)
  - [Estilos](#estilos)
- [Requisitos del Sistema](#requisitos-del-sistema)
- [Instalación](#instalación)
- [Uso](#uso)
- [Seguridad](#seguridad)
- [Contribución](#contribución)

## Descripción General

Este es un sistema de gestión de tickets que permite a los usuarios crear, gestionar y rastrear tickets de soporte. El sistema está diseñado para ser utilizado por diferentes roles de usuarios: administradores, soporte y usuarios de sucursales.

## Estructura del Proyecto

```
SISTEMA/
├── backend/           # Backend del sistema
│   ├── config/        # Configuración del backend
│   ├── controllers/   # Controladores
│   ├── middleware/    # Middleware
│   ├── models/        # Modelos de datos
│   ├── routes/        # Rutas API
│   ├── scripts/       # Scripts de utilidad
│   └── server.js      # Punto de entrada del servidor
├── sistema-gestion/   # Frontend del sistema
│   ├── src/          # Código fuente
│   │   ├── components/ # Componentes React
│   │   ├── css/      # Estilos CSS
│   │   └── index.js  # Punto de entrada
│   └── public/       # Archivos estáticos
└── DOCS/             # Documentación
```

## Backend

### Configuración

El backend utiliza Node.js con Express como framework. Las principales dependencias son:
- Express: Framework web
- Mongoose: ORM para MongoDB
- JWT: Autenticación basada en tokens
- Bcrypt: Hashing de contraseñas
- CORS: Control de acceso cross-origin

### Autenticación

El sistema implementa un sistema de autenticación JWT que verifica los roles de usuario:
- admin: Acceso completo al sistema
- soporte: Manejo de tickets
- sucursal: Creación y seguimiento de tickets

### Base de Datos

El sistema utiliza MongoDB como base de datos principal. Actualmente está configurado para usar MongoDB Memory Server en desarrollo, pero puede ser configurado para usar MongoDB local.

### API Endpoints

- `POST /api/usuarios/login`: Autenticación de usuarios
- Otros endpoints relacionados con la gestión de tickets

## Frontend

### Estructura

El frontend está desarrollado con React y utiliza componentes funcionales con hooks. La aplicación utiliza Vite como bundler y está configurada para TypeScript.

```
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

#### Rutas
- React Router para manejo de navegación
- Protección de rutas según roles de usuario

### Estilos

- CSS puro con archivos separados
- Organización modular de estilos
- Estilos globales en main.css
- Estilos componentes específicos en archivos separados

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
- MongoDB (local o en memoria)
- npm o yarn

### Frontend
- Navegador moderno
- Internet Explorer no soportado

## Instalación

### Backend

```bash
# Instalar dependencias
cd backend
npm install

# Iniciar servidor
npm run dev
```

### Frontend

```bash
# Instalar dependencias
cd sistema-gestion
npm install

# Iniciar aplicación
npm start
```

## Uso

1. Iniciar el backend con `npm run dev` en la carpeta `backend`
2. Iniciar el frontend con `npm start` en la carpeta `sistema-gestion`
3. Acceder a la aplicación en `http://localhost:3000`

## Seguridad

### Autenticación JWT

El sistema utiliza JWT (JSON Web Tokens) para la autenticación de usuarios. Los tokens son generados al iniciar sesión y se envían en el header de autorización de todas las peticiones protegidas.

### Roles de Usuario

El sistema tiene tres roles principales:

1. **Admin**
   - Acceso completo al sistema
   - Puede crear y gestionar usuarios
   - Puede ver y modificar todos los tickets
   - Puede configurar permisos y roles

2. **Soporte**
   - Acceso a tickets asignados
   - Puede crear y asignar tickets
   - Puede actualizar el estado de los tickets
   - Puede comunicarse con usuarios

3. **Sucursal**
   - Puede crear tickets
   - Puede ver sus propios tickets
   - Puede actualizar información de sus tickets
   - Puede comunicarse con soporte

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

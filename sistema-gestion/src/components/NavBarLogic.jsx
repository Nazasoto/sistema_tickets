import React from "react";
import { Link } from "react-router-dom";


// Definimos las rutas y sus nombres
const routes = {
    "/": "Inicio",
    "/soporte": "Soporte",
    "/sucursal": "Sucursal",
    "/admin": "Administracion",
    "/configuracion": "Configuracion",
    "/usuarios": "Usuarios",
    "/reportes": "Reportes",
    "/tickets": "Tickets",
    "/estadisticas": "Estadisticas",
    "/ayuda": "Ayuda",
    "/contacto": "Contacto",
    "/perfil": "Perfil",
    "/ajustes": "Ajustes",
    "/notificaciones": "Notificaciones",
    "/logs": "Logs",
    "/feedback": "Feedback",
    "/integraciones": "Integraciones",
    "/api": "API",
    "/seguridad": "Seguridad",
    "/salir": "Salir"
    // Si lo ven necesario, pueden agregar más rutas acá, estos son los que se me llegaron a ocurrir xD
};



// Definimos las rutas visibles por cada rol
const visibleRoutes = {
    admin: Object.keys(routes).filter(r => r !== "/salir"), // ejemplo de exclusión
    soporte: ["/", "/soporte", "/tickets"],
    sucursal: ["/", "/sucursal"],
    guest: ["/"]
};


// Por ultimo, creamos el componente NavBar
const NavBar = () => {
    const userRole = localStorage.getItem("userRole") || "guest";
    const allowedRoutes = visibleRoutes[userRole] || visibleRoutes["guest"];
    const filteredRoutes = Object.keys(routes).filter(route => allowedRoutes.includes(route));

    return (
        <nav>
            <ul>
                {filteredRoutes.map(route => (
                    <li key={route}>
                        <Link to={route}>{routes[route]}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default NavBar;

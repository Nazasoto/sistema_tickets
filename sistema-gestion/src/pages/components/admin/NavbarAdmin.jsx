import React from "react";
import { Link } from "react-router-dom";


const NavbarAdmin = () => {
    return (
        <nav className="navbar-admin">
            <ul className="navbar-links">
                <Link><a href="/admin/home">USUARIOS</a></Link>
                <Link><a href="/admin/settings">MOVIMIENTOS</a></Link>
                <Link><a href="./admin/reports">REPORTES</a></Link>
                  <Link><a href="/admin/users">CONFIGURACION</a></Link>
                <Link><a href="/admin/logout">SALIR</a></Link>
            </ul>
        </nav>
    );
}

export default NavbarAdmin;
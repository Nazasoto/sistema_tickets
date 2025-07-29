import React from "react";
import NavbarAdmin from "./NavbarAdmin";

const HomeAdmin = () => {
    // Obtenemos el nombre de forma local hasta que se implemente la autenticacion y se sepa el nombre del administrador
    const adminName = localStorage.getItem("adminName") || "NAZARENO";
    // Obtener la hora actual
    const currentHour = new Date().getHours();

    // Creo una variable para el saludo basado en la hora
    let greeting;
    if (currentHour < 12) {
        greeting = "BUENOS DÍAS";
    } else if (currentHour < 18) {
        greeting = "BUENAS TARDES";
    } else {
        greeting = "BUENAS NOCHES";
    }

    // Imprimos el resultado
    return (
        <div>
            <NavbarAdmin />
        <div className="container-admin">
            <h1>{greeting}, {adminName}</h1>
        </div>
        </div>
    );
};

export default HomeAdmin;

import React from "react";

const HomeSucursal = () => {
    // Obtenemos el nombre de forma local hasta que se implemente la autenticacion y se sepa el nombre del administrador
    const usuario = localStorage.getItem("usuario") || "NACHO";
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
        <div className="container-admin">
            <h1>{greeting}, {usuario}</h1>
        </div>
        </div>
    );
};

export default HomeSucursal;
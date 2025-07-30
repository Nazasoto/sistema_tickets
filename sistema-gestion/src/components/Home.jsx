// Menu principal de la aplicacion
import React from "react";
//ort Login from "./logs/Login";
//import Register from "./logs/Register";
//import AdminPanel from "../pages/AdminPanel";
import SoportePanel from "../pages/SoportePanel";
import NavBar from "./NavBarLogic";


// Creamos el componente
const Home = () => {
  return (
    <div>
      <NavBar />
      <SoportePanel />
    </div>
  );
};

export default Home;
// Menu principal de la aplicacion
import React from "react";
//ort Login from "./logs/Login";
//import Register from "./logs/Register";
//import AdminPanel from "../pages/AdminPanel";
import Dashboard from "../components/dashboard/Dashboard";
import NavBar from "./NavBarLogic";


// Creamos el componente
const Home = () => {
  return (
    <div>
      <NavBar />
      <Dashboard />
    </div>
  );
};

export default Home;
import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../logo.svg"; 
import "./Header.css"; // asegurate de tener los estilos

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login"); //  redirige al login
  };

  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="Escudo" style={{ width: 32, height: 32 }} />
      </div>
      <h1>HORARIO DE PROFESORES EPET 20</h1>
      <button className="logout-btn" onClick={handleLogout}>
        Cerrar sesión
      </button>
    </header>
  );
}



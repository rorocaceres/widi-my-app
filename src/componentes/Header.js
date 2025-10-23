import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../logo.svg";
import "../disenios/Header.css";

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-section">
          <img src={logo} alt="Escudo" className="logo-img" />
          <h1 className="header-title">Horario de Profesores EPET 20</h1>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </div>
    </header>
  );
}

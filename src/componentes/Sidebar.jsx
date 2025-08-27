import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <NavLink 
        to="/"  
        className={({ isActive }) => "sidebar-link" + (isActive ? " active" : "")}
      >
        Inicio
      </NavLink>

      <NavLink 
        to="/turnos" 
        className={({ isActive }) => "sidebar-link" + (isActive ? " active" : "")}
      >
        Turnos
      </NavLink>

      <NavLink 
        to="/horarios" 
        className={({ isActive }) => "sidebar-link" + (isActive ? " active" : "")}
      >
        Horarios
      </NavLink>

      <button 
        onClick={handleLogout} 
        className="sidebar-link logout-btn"
      >
        Cerrar Sesión
      </button>
    </div>
  );
}

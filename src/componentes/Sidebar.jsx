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
      <NavLink to="/" className={({ isActive }) => "sidebar-link" + (isActive ? " active" : "")}>
        Inicio
      </NavLink>
      <NavLink to="/profesores" className={({ isActive }) => "sidebar-link" + (isActive ? " active" : "")}>
        Profesores
      </NavLink>
      <NavLink to="/cursos" className={({ isActive }) => "sidebar-link" + (isActive ? " active" : "")}>
        Cursos
      </NavLink>
      <NavLink to="/turnos" className={({ isActive }) => "sidebar-link" + (isActive ? " active" : "")}>
        Turnos
      </NavLink>
      <NavLink to="/horarios" className={({ isActive }) => "sidebar-link" + (isActive ? " active" : "")}>
        Horarios
      </NavLink>
      <NavLink to="/contacto" className={({ isActive }) => "sidebar-link" + (isActive ? " active" : "")}>
        Contacto
      </NavLink>

      <button onClick={handleLogout} className="sidebar-link logout-btn">
        Cerrar Sesión
      </button>
    </div>
  );
}

/*import React from "react";
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
}*/

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
      <NavLink to="/" className="sidebar-link" activeclassname="active">Inicio</NavLink>
      <NavLink to="/turnos" className="sidebar-link" activeclassname="active">Turnos</NavLink>
      <NavLink to="/horarios" className="sidebar-link" activeclassname="active">Horarios</NavLink>
      <button onClick={handleLogout} className="sidebar-link logout-btn">Cerrar Sesión</button>
    </div>
  );
}


/*import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar fade-in">
      <NavLink to="/" className="sidebar-link" activeclassname="active">🏠 Inicio</NavLink>
      <NavLink to="/profesores" className="sidebar-link" activeclassname="active">👩‍🏫 Profesores</NavLink>
      <NavLink to="/cursos" className="sidebar-link" activeclassname="active">📚 Cursos</NavLink>
      <NavLink to="/turnos" className="sidebar-link" activeclassname="active">📅 Turnos</NavLink>
      <NavLink to="/horarios" className="sidebar-link" activeclassname="active">🕒 Horarios</NavLink>
      <NavLink to="/contacto" className="sidebar-link" activeclassname="active">✉️ Contacto</NavLink>
    </div>
  );
}

export default Sidebar;*/
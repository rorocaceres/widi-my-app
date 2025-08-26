import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar fade-in">
      <Link to="/" className="sidebar-link"> Inicio</Link>
      <Link to="/profesores" className="sidebar-link"> Profesores</Link>
      <Link to="/cursos" className="sidebar-link"> Cursos</Link>
      <Link to="/turnos" className="sidebar-link"> Turnos</Link>
      <Link to="/horarios" className="sidebar-link"> Horarios</Link>
      <Link to="/contacto" className="sidebar-link"> Contacto</Link>
    </div>
  );
}

export default Sidebar;
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
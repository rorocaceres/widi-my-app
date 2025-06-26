import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar fade-in">
      <Link to="/" className="sidebar-link">🏠 Inicio</Link>
      <Link to="/profesores" className="sidebar-link">👩‍🏫 Profesores</Link>
      <Link to="/cursos" className="sidebar-link">📚 Cursos</Link>
      <Link to="/turnos" className="sidebar-link">📅 Turnos</Link>
      <Link to="/contacto" className="sidebar-link">✉️ Contacto</Link>
    </div>
  );
}

export default Sidebar;

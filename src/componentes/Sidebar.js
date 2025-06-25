import React from 'react';
import { Link } from 'react-router-dom'; // Importar Link

function Sidebar() {
  return (
    <div className="sidebar fade-in">
      <Link to="/" className="sidebar-link">🏠 Inicio</Link>
      <Link to="/profesores" className="sidebar-link">👩‍🏫 Profesores</Link>
      <p>📚 Cursos</p>
      <p>📅 Turnos</p>
      <p>✉️ Contacto</p>
    </div>
  );
}

export default Sidebar;

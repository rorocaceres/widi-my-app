import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Home,
  Users,
  BookOpen,
  Calendar,
  Clock,
  Mail,
  LogOut,
} from "lucide-react";
import "./Sidebar.css";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    navigate("/LoginTemp");
  };

  const links = [
    { to: "/", label: "Inicio", icon: <Home size={18} /> },
    { to: "/profesores", label: "Profesores", icon: <Users size={18} /> },
    { to: "/cursos", label: "Cursos", icon: <BookOpen size={18} /> },
    { to: "/turnos", label: "Turnos", icon: <Calendar size={18} /> },
    { to: "/horarios", label: "Horarios", icon: <Clock size={18} /> },
    { to: "/contacto", label: "Contacto", icon: <Mail size={18} /> },
  ];

  return (
    <div className="sidebar">
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
            "sidebar-link" + (isActive ? " active" : "")
          }
        >
          {link.icon}
          {link.label}
        </NavLink>
      ))}

      <button
        type="button"
        onClick={handleLogout}
        className="sidebar-link logout-btn"
      >
        <LogOut size={18} />
        Cerrar sesión
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
    navigate("/LoginTemp");
  };

  return (
    <div className="sidebar">
      <NavLink to="/" className={({ isActive }) => "sidebar-link" + (isActive ? " active" : "")}>Inicio</NavLink>
      <NavLink to="/profesores" className={({ isActive }) => "sidebar-link" + (isActive ? " active" : "")}>Profesores</NavLink>
      <NavLink to="/cursos" className={({ isActive }) => "sidebar-link" + (isActive ? " active" : "")}>Cursos</NavLink>
      <NavLink to="/turnos" className={({ isActive }) => "sidebar-link" + (isActive ? " active" : "")}>Turnos</NavLink>
      <NavLink to="/horarios" className={({ isActive }) => "sidebar-link" + (isActive ? " active" : "")}>Horarios</NavLink>
      <NavLink to="/contacto" className={({ isActive }) => "sidebar-link" + (isActive ? " active" : "")}>Contacto</NavLink>

      <button type="button" onClick={handleLogout} className="sidebar-link logout-btn">
        Cerrar sesión
      </button>
    </div>
  );
}*/

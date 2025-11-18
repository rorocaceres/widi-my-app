import React from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  Users,
  BookOpen,
  Calendar,
  Clock,
  Mail,
} from "lucide-react";
import "../disenios/Sidebar.css";

export default function Sidebar() {
  const links = [
    { to: "/", label: "Inicio", icon: <Home size={18} /> },
    { to: "/profesores", label: "Profesores", icon: <Users size={18} /> },
    { to: "/cursos", label: "Cursos", icon: <BookOpen size={18} /> },
    { to: "/turnos", label: "Turnos", icon: <Calendar size={18} /> },
    { to: "/horarios", label: "Horarios", icon: <Clock size={18} /> },
    { to: "/alumnos", label: "Alumnos", icon: <Users size={18} /> },
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
    </div>
  );
}


/*
ULTIMO funcionando 
import React from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  Users,
  BookOpen,
  Calendar,
  Clock,
  Mail,
} from "lucide-react";
import "../disenios/Sidebar.css";

export default function Sidebar() {
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
    </div>
  );
}
*/
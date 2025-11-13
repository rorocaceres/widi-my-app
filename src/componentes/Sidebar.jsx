import React from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  Users,
  BookOpen,
  Calendar,
  GraduationCap,
  Clock,
  Mail,
} from "lucide-react";
import "../disenios/Sidebar.css";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const { user } = useAuth();
  const rol = user?.rol;

  return (
    <div className="sidebar">
      <NavLink to="/" className={({ isActive }) => "sidebar-link" + (isActive ? " active" : "")}>
        <Home size={18} /> Inicio
      </NavLink>

      {/* Alumno: sólo ve Alumnos + Inicio */}
      {rol === "alumno" && (
        <NavLink to="/alumnos" className={({ isActive }) => "sidebar-link" + (isActive ? " active" : "")}>
          <GraduationCap size={18} /> Alumnos
        </NavLink>
      )}

      {/* Profesores y preceptores ven el resto */}
      {rol !== "alumno" && (
        <>
          <NavLink to="/profesores" className={({ isActive }) => "sidebar-link" + (isActive ? " active" : "")}>
            <Users size={18} /> Profesores
          </NavLink>

          <NavLink to="/cursos" className={({ isActive }) => "sidebar-link" + (isActive ? " active" : "")}>
            <BookOpen size={18} /> Cursos
          </NavLink>

          <NavLink to="/alumnos" className={({ isActive }) => "sidebar-link" + (isActive ? " active" : "")}>
            <GraduationCap size={18} /> Alumnos
          </NavLink>

          <NavLink to="/turnos" className={({ isActive }) => "sidebar-link" + (isActive ? " active" : "")}>
            <Calendar size={18} /> Turnos
          </NavLink>

          <NavLink to="/horarios" className={({ isActive }) => "sidebar-link" + (isActive ? " active" : "")}>
            <Clock size={18} /> Horarios
          </NavLink>
        </>
      )}

      <NavLink to="/contacto" className={({ isActive }) => "sidebar-link" + (isActive ? " active" : "")}>
        <Mail size={18} /> Contacto
      </NavLink>
    </div>
  );
}

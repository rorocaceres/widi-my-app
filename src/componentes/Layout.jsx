// src/componentes/Layout.jsx
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import "../disenios/Layout.css";

export default function Layout() {
  return (
    <div className="layout">
      {/* Header */}
      <header className="header">
        HORARIO DE PROFESORES EPET 20
      </header>

      {/* Sidebar */}
      <Sidebar />

      {/* Contenido dinámico (React Router) */}
      <main className="content">
        <Outlet />
      </main>

      {/* Panel de usuario */}
      <aside className="profile-panel">
        <img src="/avatar.png" alt="Perfil" />
        <h3>Ángela</h3>
        <button className="logout-btn">Cerrar sesión</button>
      </aside>
    </div>
  );
}

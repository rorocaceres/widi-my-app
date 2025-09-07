import React from "react";
import './disenios/App.css';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";

import Sidebar from "./componentes/Sidebar";
import Header from "./componentes/Header";
import Profile from "./pagess/Profile";
import LoginTemp from "./pagess/LoginTemp";
import TablaHorarios from "./componentes/TablaHorarios";
import Turnos from "./componentes/Turnos";
import Inicio from "./pagess/Inicio";
import Profesores from "./componentes/Profesores";
import Cursos from "./pagess/Cursos";
import Contacto from "./componentes/Contacto";

localStorage.removeItem("loggedIn");
localStorage.removeItem("usuario");

// Layout con Header, Sidebar, Outlet y Profile
function Layout() {
  return (
    <div className="app-layout">
      <header className="header"><Header /></header>

      <div className="app-content">
        <aside className="sidebar"><Sidebar /></aside>
        <main className="main-area"><Outlet /></main>
        <aside className="profile"><Profile /></aside>
      </div>
    </div>
  );
}

// PrivateRoute: si no hay sesión, va a Login
function PrivateRoute({ children }) {
  const loggedIn = localStorage.getItem("loggedIn");
  return loggedIn ? children : <Navigate to="/LoginTemp" />;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/LoginTemp" element={<LoginTemp />} />
        <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
          <Route index element={<Inicio />} />
          <Route path="profesores" element={<Profesores />} />
          <Route path="cursos" element={<Cursos />} />
          <Route path="turnos" element={<Turnos />} />
          <Route path="horarios" element={<TablaHorarios />} />
          <Route path="contacto" element={<Contacto />} />
        </Route>

        {/* Cualquier otra ruta redirige a login */}
        <Route path="*" element={<Navigate to="/LoginTemp" replace />} />
      </Routes>
    </Router>
  );
}
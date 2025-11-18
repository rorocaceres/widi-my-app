import React from "react";
import "./disenios/App.css";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";

import Sidebar from "./componentes/Sidebar";
import Header from "./componentes/Header";
import Login from "./componentes/Login";
import Register from "./pagess/Register";
import RegisterAlumno from "./pagess/RegisterAlumno"; 
import TablaHorarios from "./componentes/TablaHorarios";
import Turnos from "./componentes/Turnos";
import Inicio from "./pagess/Inicio";
import Profesores from "./componentes/Profesores";
import Cursos from "./pagess/Cursos";
import Contacto from "./componentes/Contacto";
import Alumnos from "./pagess/Alumnos";
import AlumnosHorarios from "./componentes/AlumnosHorarios";

import { useAuth } from "./context/AuthContext";
import RightSidebar from "./componentes/rightSidebar";

// Layout general
function Layout() {
  return (
    <div className="app-layout">
      <header className="header"><Header /></header>
      <div className="app-content">
        <aside className="sidebar"><Sidebar /></aside>
        <main className="main-area"><Outlet /></main>
        <aside className="right-sidebar"><RightSidebar /></aside>
      </div>
    </div>
  );
}

// Protección de rutas
function PrivateRoute({ children }) {
  const { loggedIn } = useAuth();
  return loggedIn ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <Router>
      <Routes>

        {/* Publicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register-alumno" element={<RegisterAlumno />}/>

        {/* RUTAS PROTEGIDAS */}
        <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>

          {/* Home */}
          <Route index element={<Inicio />} />

          {/* Profes y Preceptores */}
          <Route path="profesores" element={<Profesores />} />
          <Route path="cursos" element={<Cursos />} />
          <Route path="turnos" element={<Turnos />} />
          <Route path="horarios" element={<TablaHorarios />} />
          <Route path="contacto" element={<Contacto />} />

          {/* ALUMNOS */}
          <Route path="alumnos" element={<Alumnos />} />
          <Route path="alumnos/horarios" element={<AlumnosHorarios />} />

        </Route>

        {/* Redirección general */}
        <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>
    </Router>
  );
}


/*
ULTI FUNCIONANDO
import React from "react";
import './disenios/App.css';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";

import Sidebar from "./componentes/Sidebar";
import Header from "./componentes/Header";
import Login from "./componentes/Login";
import Register from "./pagess/Register";
import TablaHorarios from "./componentes/TablaHorarios";
import Turnos from "./componentes/Turnos";
import Inicio from "./pagess/Inicio";
import Profesores from "./componentes/Profesores";
import Cursos from "./pagess/Cursos";
import Contacto from "./componentes/Contacto";
import { useAuth } from "./context/AuthContext"; 
import RightSidebar from "./componentes/rightSidebar";

// Layout con Header, Sidebar, Main y RightSidebar
function Layout() {
  return (
    <div className="app-layout">
      <header className="header"><Header /></header>
      <div className="app-content">
        <aside className="sidebar"><Sidebar /></aside>
        <main className="main-area"><Outlet /></main>
        <aside className="right-sidebar"><RightSidebar /></aside>
      </div>
    </div>
  );
}

// PrivateRoute: si no hay sesión, va a /login
function PrivateRoute({ children }) {
  const { loggedIn } = useAuth(); 
  return loggedIn ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />


        <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
          <Route index element={<Inicio />} />
          <Route path="profesores" element={<Profesores />} />
          <Route path="cursos" element={<Cursos />} />
          <Route path="turnos" element={<Turnos />} />
          <Route path="horarios" element={<TablaHorarios />} />
          <Route path="contacto" element={<Contacto />} />
        </Route>


        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}
*/
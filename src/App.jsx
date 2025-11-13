import React from "react";
import "./disenios/App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
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
import Alumnos from "./pagess/Alumnos";

// 🔹 Layout general
function Layout() {
  return (
    <div className="app-layout">
      <header className="header">
        <Header />
      </header>
      <div className="app-content">
        <aside className="sidebar">
          <Sidebar />
        </aside>
        <main className="main-area">
          <Outlet />
        </main>
        <aside className="right-sidebar">
          <RightSidebar />
        </aside>
      </div>
    </div>
  );
}

// 🔹 Rutas privadas
function PrivateRoute({ children }) {
  const { loggedIn } = useAuth();
  return loggedIn ? children : <Navigate to="/login" />;
}

// 🔹 Control de roles
function RoleRoute({ allowedRoles, children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(user.rol)) return <Navigate to="/" replace />;
  return children;
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/"element={<PrivateRoute><Layout /></PrivateRoute>}>
          <Route index element={<Inicio />} />
          <Route path="profesores"element={<RoleRoute allowedRoles={["profesor", "preceptor"]}><Profesores /></RoleRoute>}/>
          <Route path="cursos"element={<RoleRoute allowedRoles={["profesor", "preceptor"]}><Cursos /></RoleRoute>}/>
          <Route path="turnos"element={<RoleRoute allowedRoles={["profesor", "preceptor"]}><Turnos /></RoleRoute>}/>
          <Route path="horarios"element={<RoleRoute allowedRoles={["alumno", "profesor", "preceptor"]}><TablaHorarios /></RoleRoute>}/>
          <Route path="contacto"element={<RoleRoute allowedRoles={["profesor", "preceptor"]}><Contacto /></RoleRoute>}/>
          <Route path="alumnos"element={<RoleRoute allowedRoles={["alumno", "preceptor"]}><Alumnos /></RoleRoute>}/></Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

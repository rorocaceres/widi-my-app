import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./componentes/Sidebar";
import Header from "./componentes/Header";
import Profile from "./componentes/Profile";
import LoginTemp from "./componentes/LoginTemp";
import TablaHorarios from "./componentes/TablaHorarios";
import Turnos from "./componentes/Turnos";
import Inicio from "./componentes/Inicio";
import Profesores from "./componentes/Profesores";
import Cursos from "./componentes/Cursos";
import Contacto from "./componentes/Contacto";

function PrivateRoute({ children }) {
  const loggedIn = localStorage.getItem("loggedIn");
  return loggedIn ? children : <Navigate to="/LoginTemp" />;
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Login */}
        <Route path="/LoginTemp" element={<LoginTemp />} />

        {/* Layout privado */}
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <div className="app-layout">
                <Header />

                <div className="app-content">
                  <aside className="sidebar">
                    <Sidebar />
                  </aside>

                  <main className="main-area">
                    <Route path="/" element={<Inicio />} />
                    <Route path="/profesores" element={<Profesores />} />
                    <Route path="/cursos" element={<Cursos />} />
                    <Route path="/turnos" element={<Turnos />} />
                    <Route path="/horarios" element={<TablaHorarios />} />
                    <Route path="/contacto" element={<Contacto />} />
                  </main>

                  <aside className="profile">
                    <Profile /> {/* sin logout */}
                  </aside>
                </div>
              </div>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

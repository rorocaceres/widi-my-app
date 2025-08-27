 import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Componentes
import Sidebar from "./componentes/Sidebar";
import Header from "./componentes/Header";
import Profile from "./componentes/Profile";
import Login from "./componentes/Login"; 
import TablaHorarios from "./componentes/TablaHorarios";
import Turnos from "./componentes/Turnos";
import Inicio from "./componentes/Inicio"; 
import Profesores from "./componentes/Profesores";
import Cursos from "./componentes/Cursos";
import Contacto from "./componentes/Contacto";

// Ruta privada
function PrivateRoute({ children }) {
  const loggedIn = localStorage.getItem("loggedIn");
  return loggedIn ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Login sin layout */}
        <Route path="/login" element={<Login />} />

        {/* Sitio con layout completo */}
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <div className="app-layout">
                {/* Header */}
                <header className="header">
                  <Header />
                </header>

                {/* Contenido principal: sidebar + main + perfil */}
                <div className="app-content">
                  {/* Sidebar izquierda */}
                  <aside className="sidebar">
                    <Sidebar />
                  </aside>

                  {/* Contenido central */}
                  <main className="main-area">
                    <Routes>
                      <Route path="/" element={<Inicio />} />
                      <Route path="/profesores" element={<Profesores />} />
                      <Route path="/cursos" element={<Cursos />} />
                      <Route path="/turnos" element={<Turnos />} />
                      <Route path="/horarios" element={<TablaHorarios />} />
                      <Route path="/contacto" element={<Contacto />} />
                    </Routes>
                  </main>

                  {/* Perfil derecha */}
                  <aside className="profile">
                    <Profile />
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

 /*import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Componentes
import Sidebar from "./componentes/Sidebar";
import Header from "./componentes/Header";
import Profile from "./componentes/Profile";
import Login from "./componentes/Login"; 
import TablaHorarios from "./componentes/TablaHorarios";
import Turnos from "./componentes/Turnos";
import Inicio from "./componentes/Inicio"; 
import Profesores from "./componentes/Profesores";
import Cursos from "./componentes/Cursos";
import Contacto from "./componentes/Contacto";

// Ruta privada
function PrivateRoute({ children }) {
  const loggedIn = localStorage.getItem("loggedIn");
  return loggedIn ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Login sin layout }
        <Route path="/login" element={<Login />} />

        {/* Resto del sitio con layout completo }
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <div className="app-layout">
                {/* Header arriba }
                <header className="header">
                  <Header />
                </header>

                {/* Contenido general (sidebar + main + profile) }
                <div className="app-content">
                  {/* Sidebar izquierda }
                  <aside className="sidebar">
                    <Sidebar />
                  </aside>

                  {/* Contenido central }
                  <main className="main-area">
                    <Routes>
                      <Route path="/" element={<Inicio />} />
                      <Route path="/profesores" element={<Profesores />} />
                      <Route path="/cursos" element={<Cursos />} />
                      <Route path="/turnos" element={<Turnos />} />
                      <Route path="/horarios" element={<TablaHorarios />} />
                      <Route path="/contacto" element={<Contacto />} />
                    </Routes>
                  </main>

                  {/* Perfil derecha }
                  <aside className="profile">
                    <Profile />
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

/*import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Componentes
import Sidebar from "./componentes/Sidebar";
import Header from "./componentes/Header";
import Profile from "./componentes/Profile";
import Login from "./componentes/LoginTemp"; // renómbralo a Login.jsx cuando corresponda
import TablaHorarios from "./componentes/TablaHorarios";
import Turnos from "./componentes/Turnos";
import Inicio from "./componentes/Inicio"; 

// Ruta privada
function PrivateRoute({ children }) {
  const loggedIn = localStorage.getItem("loggedIn");
  return loggedIn ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Login sin layout }
        <Route path="/login" element={<Login />} />

        {/* Resto del sitio con layout completo }
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <div className="app-layout">
                {/* Header arriba }
                <header className="header">
                  <Header />
                </header>

                {/* Contenido general (sidebar + main + profile) }
                <div className="app-content">
                  {/* Sidebar izquierda /}
                  <aside className="sidebar">
                    <Sidebar />
                  </aside>

                  {/* Contenido central }
                  <main className="main-area">
                    <Routes>
                      <Route path="/" element={<Inicio />} />
                      <Route path="/turnos" element={<Turnos />} />
                      <Route path="/horarios" element={<TablaHorarios />} />
                    </Routes>
                  </main>

                  {/* Perfil derecha }
                  <aside className="profile">
                    <Profile />
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

/*import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Componentes
import Sidebar from "./componentes/Sidebar";
import Header from "./componentes/Header";
import Profile from "./componentes/Profile";
import Login from "./componentes/LoginTemp"; // cámbialo a Login.jsx cuando renombres
import TablaHorarios from "./componentes/TablaHorarios";
import Turnos from "./componentes/Turnos";
import Inicio from "./componentes/Inicio"; 

// Ruta privada
function PrivateRoute({ children }) {
  const loggedIn = localStorage.getItem("loggedIn");
  return loggedIn ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Login sin layout }
        <Route path="/login" element={<Login />} />

        {/* Resto del sitio con layout completo }
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <div className="app-shell">
                {/* Header arriba }
                <Header />

                {/* Sidebar izquierda }
                <aside className="sidebar-area">
                  <Sidebar />
                </aside>

                {/* Contenido central }
                <main className="main-area">
                  <Routes>
                    <Route path="/" element={<Inicio />} />
                    <Route path="/turnos" element={<Turnos />} />
                    <Route path="/horarios" element={<TablaHorarios />} />
                  </Routes>
                </main>

                {/* Perfil derecha }
                <aside className="profile-area">
                  <Profile />
                </aside>
              </div>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}



export default App;
*/
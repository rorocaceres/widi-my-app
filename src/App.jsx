import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./componentes/Sidebar";
import Login from "./componentes/login";
import Turnos from "./componentes/Turnos";
import TablaHorarios from "./componentes/TablaHorarios";

function PrivateRoute({ children }) {
  const loggedIn = localStorage.getItem("loggedIn");
  return loggedIn ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<PrivateRoute><h1>Bienvenido</h1></PrivateRoute>} />
            <Route path="/turnos" element={<PrivateRoute><Turnos /></PrivateRoute>} />
            <Route path="/horarios" element={<PrivateRoute><TablaHorarios /></PrivateRoute>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

/*import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Componentes
import Header from "./componentes/Header";
import Sidebar from "./componentes/Sidebar";
import Profile from "./componentes/Profile";
import Login from "./componentes/login";
import TablaHorarios from "./componentes/TablaHorarios";
import Turnos from "./componentes/Turnos";
import Inicio from "./componentes/Inicio";
import Contacto from "./componentes/Contacto";

function App() {
  const [logueado, setLogueado] = useState(false);

  return (
    <Router>
      {logueado ? (
        <div className="app-shell">
          <Header onLogout={() => setLogueado(false)} />

          <aside className="sidebar-area">
            <Sidebar />
          </aside>

          <main className="main-area">
            <Routes>
              <Route path="/" element={<Inicio />} />
              <Route path="/horarios" element={<TablaHorarios />} />
              <Route path="/turnos" element={<Turnos />} />
              <Route path="/contacto" element={<Contacto />} />
            </Routes>
          </main>

          <aside className="profile-area">
            <Profile onLogout={() => setLogueado(false)} />
          </aside>
        </div>
      ) : (
        <Login onLogin={() => setLogueado(true)} />
      )}
    </Router>
  );
}

export default App;


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Componentes principales
import Header from './componentes/Header';
import Sidebar from './componentes/Sidebar';
import Profile from './componentes/Profile';
import TablaHorarios from './componentes/TablaHorarios';

// Páginas
import Inicio from './pages/Inicio';
import Contacto from './pages/Contacto';
import Productos from './pages/Productos';
import Turnos from './pages/Turnos';
import Login from './pages/Login';

export default function App() {
  return (
    <Router>
      <div className="app-shell">
        { Header }
        <Header />

        { Sidebar lateral }
        <aside className="sidebar-area">
          <Sidebar />
        </aside>

        { Área principal de contenido }
        <main className="main-area">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/turnos" element={<Turnos />} />
            <Route path="/login" element={<Login />} />
            <Route path="/horarios" element={<TablaHorarios />} />
          </Routes>
        </main>

        { Perfil lateral derecho }
        <aside className="profile-area">
          <Profile />
        </aside>
      </div>
    </Router>
  );
}
/*
/*
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Sidebar from './componentes/Sidebar';
import Header from './componentes/Header';
import Profile from './componentes/Profile';
import ScheduleTable from './componentes/ScheduleTable'; 
import TablaHorarios from './componentes/TablaHorarios';

export default function App() {
  return (
    <Router>
      <div className="app-shell">
        <Header />

        <aside className="sidebar-area">
          <Sidebar />
        </aside>

        <main className="main-area">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/turnos" element={<Turnos />} />
            <Route path="/login" element={<Login />} />
            <Route path="/horarios" element={<TablaHorarios />} />
          </Routes>
        </main>

        <aside className="profile-area">
          <Profile />
        </aside>
      </div>
    </Router>
  );
}

/*
/*import React from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Profile from "./components/Profile";
import TablaHorarios from "./components/TablaHorarios";
import "./App.css";

export default function App() {
  return (
    <div className="app-shell">
      <Header />
      <aside className="sidebar-area">
        <Sidebar />
      </aside>
      <main className="main-area">
        <TablaHorarios />
      </main>
      <aside className="profile-area">
        <Profile />
      </aside>
    </div>
  );
}*/

/*import { Routes, Route } from "react-router-dom";
import Sidebar from "./componentes/Sidebar";
import Header from "./componentes/Header";
import Inicio from "./pages/Inicio";
import Contacto from "./pages/Contacto";
import Productos from "./pages/Productos";
import Turnos from "./componentes/Turnos";
import Login from "./pages/Login";
import "./componentes/style.css";

function App() {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="page-content">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/turnos" element={<Turnos />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;*/

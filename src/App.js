// Archivo: App.js mejorado y rediseñado

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Sidebar from './componentes/Sidebar';
import Header from './componentes/Header';
import Profile from './componentes/Profile';
import ScheduleTable from './componentes/ScheduleTable'; 
import TablaHorarios from './componentes/TablaHorarios';

function App() {
  return (
    <Router>
      <div className="app-layout">
        <Header />
        <div className="app-content">
          <Sidebar />
          <main className="main-area">
            <Routes>
              <Route
                path="/"
                element={
                  <div className="page-home">
                    <ScheduleTable />
                    <Profile />
                  </div>
                }
              />
              <Route
                path="/profesores"
                element={
                  <div className="page-profesores">
                    <section className="curso-section">
                      <div className="curso-selector">
                        {["1RO 1RA", "1RO 1DA", "2DO 1RA", "3DO 1RA", "4RO 1RA", "6TO 1RA"].map(curso => (
                          <button key={curso} className="curso-btn">{curso}</button>
                        ))}
                      </div>
                      <div className="curso-info">
                        <h2>Curso: 1RO 1RA</h2>
                        <TablaHorarios />
                      </div>
                    </section>

                    <aside className="perfil-sidebar">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
                        alt="Angela"
                        className="perfil-img"
                      />
                      <p className="perfil-nombre">Angela</p>
                      <button className="logout">Cerrar sesión</button>
                    </aside>
                  </div>
                }
              />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;

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
      <div className="app-container">
        <Header />
        <div className="main-content">
          <Sidebar />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <ScheduleTable />
                  <Profile />
                </>
              }
            />
            <Route
              path="/profesores"
              element={
                <div className="content">
                  <div className="curso-selector">
                    {['1RO 1RA', '1RO 1DA', '2DO 1RA', '3DO 1RA', '4RO 1RA', '6TO 1RA'].map(curso => (
                      <button key={curso} className="curso-btn">{curso}</button>
                    ))}
                  </div>
                  <div className="curso-info">
                    <h2>Curso: 1RO 1RA</h2>
                    <TablaHorarios />
                  </div>
                  <div className="perfil">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
                      alt="Angela"
                      style={{ borderRadius: '50%' }}
                    />
                    <p>Angela</p>
                    <button>Cerrar sesion</button>
                  </div>
                </div>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

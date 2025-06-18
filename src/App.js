import React from 'react';
import './App.css';
import Header from './componentes/Header';
import Sidebar from './componentes/Sidebar';
import Profile from './componentes/Profile';
import ScheduleTable from './componentes/ScheduleTable';
import TallerSection from './componentes/TallerSection';
import TeoriaSection from './componentes/TeoriaSection';

function App() {
  return (
    <div className="app-container">
      <Header />
      <div className="main-content">
        <Sidebar />

        {/* Seccion original */}
        <ScheduleTable />
        <Profile />

        <div className="card">
          <h2 className="section-title">Seccion de Taller</h2>
          <TallerSection />
        </div>

        <div className="card">
          <h2 className="section-title">Seccion de Teoria</h2>
          <TeoriaSection />
        </div>
      </div>
    </div>
  );
}

export default App;


import React from 'react';
import './App.css';
import Header from './componentes/Header';
import Sidebar from './componentes/Sidebar';
import Profile from './componentes/Profile';
import ScheduleTable from './componentes/ScheduleTable';

function App() {
  return (
    <div className="app-container">
      <Header />
      <div className="main-content">
        <Sidebar />
        <ScheduleTable />
        <Profile />
      </div>
    </div>
  );
}

export default App;

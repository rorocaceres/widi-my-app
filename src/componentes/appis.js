import React, { useState } from 'react';
import Login from './componentesInicioSesion/Login';
import TablaHorarios from './componentes/TablaHorarios';

function App() {
  const [logueado, setLogueado] = useState(false);

  return (
    <>
      {logueado ? (
        <TablaHorarios onLogout={() => setLogueado(false)} />
      ) : (
        <>
          <Login onLogin={() => setLogueado(true)} />
        </>
      )}
    </>
  );
}

export default App;

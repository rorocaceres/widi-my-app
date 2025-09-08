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
/*import React, { useState, useEffect } from 'react';
import Login from './componentes/LoginTemp'; 

function App() {
  const [usuario, setUsuario] = useState(null); 

  useEffect(() => {
    const stored = localStorage.getItem("usuario");
    if (stored) setUsuario(JSON.parse(stored));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    setUsuario(null);
  };

  const handleLogin = (usuarioData) => {
    console.log("Usuario logueado:", usuarioData);
    setUsuario(usuarioData);
    localStorage.setItem("usuario", JSON.stringify(usuarioData));
  };

  return (
    <>
      {!usuario ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Cursos usuario={usuario} onLogout={handleLogout} />
      )}
    </>
  );
}

export default App;
*/


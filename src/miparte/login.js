import React from 'react';
import 'style.css';

function Login({ onLogin }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="contenedor">
      <img src="../../img/logo.png.jpg" alt="Logo de la escuela" className="logo" />
      <h2>Iniciar Sesión</h2>

      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Usuario" required />
        <input type="password" placeholder="Contraseña" required />
        <input type="submit" value="Ingresar" className="boton" />
      </form>
    </div>
  );
}

export default Login;

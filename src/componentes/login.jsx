import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Usuario y contraseña simples para ejemplo
    if (user === "admin" && pass === "1234") {
      localStorage.setItem("loggedIn", "true"); // Guarda sesión simple
      navigate("/"); // Va al inicio
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Iniciar Sesión</h2>
        {error && <p className="error">{error}</p>}
        <input
          type="text"
          placeholder="Usuario"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          required
        />
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
}

/*import React from "react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    //  Datos simulados
    if (user === "admin" && pass === "1234") {
      setError("");
      navigate("/productos"); //  Redirige al login exitoso
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="contenedor">
      <img
        src="../../img/logo.png.jpg"
        alt="Logo de la escuela"
        className="logo"
      />
      <h2>Iniciar Sesión</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Usuario"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          required
        />
        <input type="submit" value="Ingresar" className="boton" />
      </form>

      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
    </div>
  );
}

export default Login;

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

export default Login;*/

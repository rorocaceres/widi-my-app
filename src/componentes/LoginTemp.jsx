import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css"; 

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
    <div className="contenedor">
      <form onSubmit={handleLogin}>
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
        <input type="submit" value="Ingresar" className="boton" />
      </form>
    </div>
  );
}
/*import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css"; 

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
    <div className="contenedor">
  <form onSubmit={handleLogin}>
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
        <input type="submit" value="Ingresar" className="boton" />
      </form>
    </div>
  );
}
*/
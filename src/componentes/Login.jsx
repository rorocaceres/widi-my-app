import React, { useState } from "react";
import "./../disenios/Login.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase/client";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setError("Correo o contraseña incorrectos");
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="login-box">
          <h2 className="login-title">Inicia tu viaje</h2>
          <h1 className="login-subtitle">Iniciar sesión en Horario Profesores EPET 20</h1>

          <form onSubmit={handleLogin}>
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && <p className="error">{error}</p>}

            <button type="submit" className="login-btn">
              Entrar
            </button>
          </form>

          <div className="divider">o inicia sesión con</div>

          <div className="social-buttons">
            <button className="social-btn fb">f</button>
            <button className="social-btn google">G</button>
            <button className="social-btn apple"></button>
          </div>

          <p className="register-text">
            ¿No tenés cuenta? <a href="/register">Registrate</a>
          </p>
        </div>
      </div>

      <div className="login-right"></div>
    </div>
  );
}

export default Login;

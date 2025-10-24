import React, { useState } from "react";
import '../disenios/Login.css';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase/client";
import { useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/Inicio");
    } catch (err) {
      console.error(err);
      if (err.code === "auth/email-already-in-use") {
        setError("Este correo ya está registrado");
      } else if (err.code === "auth/invalid-email") {
        setError("Correo electrónico inválido");
      } else if (err.code === "auth/weak-password") {
        setError("La contraseña es demasiado débil");
      } else {
        setError("Error al crear la cuenta");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="login-box">
          <h2 className="login-title">Empezá tu viaje</h2>
          <h1 className="login-subtitle">Registrate en EPET 20 - horario de profesores</h1>

          <form onSubmit={handleRegister}>
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

            <label htmlFor="confirmPassword">Confirmar contraseña</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="********"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            {error && <p className="error">{error}</p>}

            <button type="submit" className="login-btn">
              Registrarme
            </button>
          </form>

          <div className="divider">o registrate con</div>

          <div className="social-buttons">
            <button className="social-btn fb">f</button>
            <button className="social-btn google">G</button>
            <button className="social-btn apple"></button>
          </div>

          <p className="register-text">
            ¿Ya tenés cuenta? <a href="/LoginTemp">Iniciá sesión</a>
          </p>
        </div>
      </div>

      <div className="login-right"></div>
    </div>
  );
}

export default Register;

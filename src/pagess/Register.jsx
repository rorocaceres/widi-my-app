import React, { useState } from "react";
import "../disenios/Login.css";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/client";
import { useNavigate } from "react-router-dom";
import { getFirestore, doc, setDoc } from "firebase/firestore";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [rol, setRol] = useState("profesor");
  const [turno, setTurno] = useState("");
  const [cursos, setCursos] = useState([""]); // ✅ Array de cursos (solo para preceptores)
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const db = getFirestore();

  // ✅ Agregar o eliminar curso
  const handleAddCurso = () => setCursos([...cursos, ""]);
  const handleRemoveCurso = (index) => {
    const nuevos = cursos.filter((_, i) => i !== index);
    setCursos(nuevos);
  };
  const handleCursoChange = (index, value) => {
    const nuevos = [...cursos];
    nuevos[index] = value;
    setCursos(nuevos);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: nombre });

      const coleccion = rol === "preceptor" ? "preceptores" : "profesores";

      await setDoc(doc(db, coleccion, user.uid), {
        uid: user.uid,
        nombre,
        email,
        rol,
        turno: rol === "preceptor" ? turno : null,
        cursos: rol === "preceptor" ? cursos.filter((c) => c.trim() !== "") : null,
      });

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
            <label htmlFor="nombre">Nombre y apellido</label>
            <input
              type="text"
              id="nombre"
              placeholder="Ej: Antonella Blasco"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />

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

            <label htmlFor="rol">Rol</label>
            <select id="rol" value={rol} onChange={(e) => setRol(e.target.value)}>
              <option value="profesor">Profesor</option>
              <option value="preceptor">Preceptor</option>
            </select>

            {rol === "preceptor" && (
              <>
                <label htmlFor="turno">Turno</label>
                <select id="turno" value={turno} onChange={(e) => setTurno(e.target.value)} required>
                  <option value="">Seleccionar turno</option>
                  <option value="mañana">Mañana</option>
                  <option value="tarde">Tarde</option>
                  <option value="noche">Noche</option>
                </select>

                <label>Cursos a cargo</label>
                {cursos.map((curso, index) => (
                  <div key={index} className="curso-input">
                    <input
                      type="text"
                      placeholder={`Curso ${index + 1} (Ej: 6to 2da)`}
                      value={curso}
                      onChange={(e) => handleCursoChange(index, e.target.value)}
                    />
                    {index > 0 && (
                      <button
                        type="button"
                        className="remove-btn"
                        onClick={() => handleRemoveCurso(index)}
                      >
                        ❌
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  className="add-curso-btn"
                  onClick={handleAddCurso}
                >
                  + Agregar otro curso
                </button>
              </>
            )}

            {error && <p className="error">{error}</p>}

            <button type="submit" className="login-btn">
              Registrarme
            </button>
          </form>

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

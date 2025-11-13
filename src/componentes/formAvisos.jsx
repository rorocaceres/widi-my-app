import React, { useState } from "react";
import { db } from "../firebase/client";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

export default function FormAvisos() {
  const { user } = useAuth();
  const [titulo, setTitulo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [targetCurso, setTargetCurso] = useState("all");
  const [enviando, setEnviando] = useState(false);

  const handleEnviar = async (e) => {
    e.preventDefault();
    if (!titulo || !mensaje) return alert("Completa todos los campos.");

    try {
      setEnviando(true);
      await addDoc(collection(db, "avisos"), {
        titulo,
        mensaje,
        targetCurso,
        creadoPor: user.displayName || user.email, // ✅ corregido
        createdAt: serverTimestamp(),
      });
      alert("Aviso enviado correctamente");
      setTitulo("");
      setMensaje("");
      setTargetCurso("all");
    } catch (err) {
      console.error("Error al enviar aviso:", err);
      alert("Error al enviar aviso.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <form className="form-avisos" onSubmit={handleEnviar}>
      <h3>Enviar aviso a alumnos</h3>
      <label>Título:</label>
      <input
        type="text"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />

      <label>Mensaje:</label>
      <textarea
        value={mensaje}
        onChange={(e) => setMensaje(e.target.value)}
        rows={4}
      />

      <label>Curso destino:</label>
      <select
        value={targetCurso}
        onChange={(e) => setTargetCurso(e.target.value)}
      >
        <option value="all">Todos los cursos</option>
        <option value="5° 1ra">5° 1ra</option>
        <option value="5° 2da">5° 2da</option>
        <option value="6° 1ra">6° 1ra</option>
      </select>

      <button type="submit" disabled={enviando}>
        {enviando ? "Enviando..." : "Enviar Aviso"}
      </button>
    </form>
  );
}
import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/client";
import "../disenios/Comunicaciones.css";

export default function ComunicacionesForm({ curso }) {
  const [mensaje, setMensaje] = useState("");

  const enviarMensaje = async (e) => {
    e.preventDefault();
    if (!mensaje.trim()) return;

    await addDoc(collection(db, "comunicaciones"), {
      curso,
      mensaje,
      fecha: serverTimestamp()
    });

    setMensaje("");
    alert("Mensaje enviado.");
  };

  return (
    <div className="comunicaciones-form">
      <h4>Enviar comunicación</h4>
      
      <form onSubmit={enviarMensaje}>
        <textarea
          placeholder="Escriba un mensaje..."
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
        />

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/client";
import "../disenios/Comunicaciones.css";

export default function ComunicacionesLista({ curso }) {
  const [mensajes, setMensajes] = useState([]);

  useEffect(() => {
    if (!curso) return;

    const cargar = async () => {
      const snap = await getDocs(
        query(collection(db, "comunicaciones"), where("curso", "==", curso))
      );

      setMensajes(snap.docs.map((d) => d.data()));
    };

    cargar();
  }, [curso]);

  return (
    <div className="comunicaciones-lista">
      <h3>📢 Comunicaciones del curso {curso}</h3>

      {mensajes.length === 0 ? (
        <p>No hay comunicaciones por el momento.</p>
      ) : (
        mensajes.map((m, i) => (
          <div key={i} className="mensaje-item">
            <strong>{m.titulo}</strong>
            <p>{m.contenido}</p>
            <small>
              {m.fecha?.seconds &&
                new Date(m.fecha.seconds * 1000).toLocaleString()}
            </small>
          </div>
        ))
      )}
    </div>
  );
}

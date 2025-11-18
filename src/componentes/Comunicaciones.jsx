import React, { useEffect, useState } from "react";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { db } from "../firebase/client";
import "../disenios/Comunicaciones.css";

export default function ComunicacionesCaja({ alumno }) {
  const [mensajes, setMensajes] = useState([]);

  useEffect(() => {
    const cargarMensajes = async () => {
      if (!alumno?.curso) return;

      const q = query(
        collection(db, "comunicaciones"),
        where("curso", "==", alumno.curso),
        orderBy("fecha", "desc")
      );

      const snap = await getDocs(q);
      setMensajes(
        snap.docs.map((d) => ({ id: d.id, ...d.data() }))
      );
    };

    cargarMensajes();
  }, [alumno]);

  return (
    <div className="comunicaciones-caja">
      <h4>📢 Comunicaciones</h4>

      {mensajes.length === 0 ? (
        <p className="sin-mensajes">No hay mensajes por ahora.</p>
      ) : (
        mensajes.map((m) => (
          <div key={m.id} className="mensaje-item">
            <p>{m.mensaje}</p>
            <small>{new Date(m.fecha.seconds * 1000).toLocaleString()}</small>
          </div>
        ))
      )}
    </div>
  );
}

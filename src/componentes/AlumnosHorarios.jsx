import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where, addDoc } from "firebase/firestore";
import { db } from "../firebase/client";
import { useAuth } from "../context/AuthContext";
import "../disenios/TablaHorarios.css";

export default function AlumnosHorarios() {
  const { user } = useAuth();
  const [horarios, setHorarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [alumnoDoc, setAlumnoDoc] = useState(null);

  useEffect(() => {
    const cargar = async () => {
      if (!user?.email) {
        setCargando(false);
        return;
      }

      try {
        const alumnoSnap = await getDocs(
          query(collection(db, "alumnos"), where("email", "==", user.email))
        );

        if (alumnoSnap.empty) {
          setHorarios([]);
          setCargando(false);
          return;
        }

        const alumno = alumnoSnap.docs[0].data();
        setAlumnoDoc(alumno);

        const curso = alumno.curso;
        const turno = alumno.turno;

        const hSnap = await getDocs(
          query(collection(db, "horarios"), where("curso", "==", curso))
        );

        let docs = hSnap.docs.map((d) => ({ id: d.id, ...d.data() }));

        if (docs.some((h) => h.turno)) {
          docs = docs.filter((h) => h.turno === turno);
        }

        // Ordenar por día y hora
        const order = {
          Lunes: 0, Martes: 1, Miércoles: 2, Jueves: 3, Viernes: 4,
          Sabado: 5, Domingo: 6
        };

        docs.sort((a, b) => {
          const da = order[a.dia] ?? 99;
          const db = order[b.dia] ?? 99;
          if (da !== db) return da - db;
          return (a.horaInicio || "").localeCompare(b.horaInicio || "");
        });

        setHorarios(docs);
      } catch (e) {
        console.error("Error cargar horarios alumno:", e);
        setHorarios([]);
      } finally {
        setCargando(false);
      }
    };

    cargar();
  }, [user]);

  // Registrar asistencia del alumno
  const marcarAsistencia = async (clase) => {
    try {
      await addDoc(collection(db, "presentismo"), {
        alumnoUid: user.uid || null,
        alumnoNombre: user.displayName || user.email,
        usuarioEmail: user.email,
        usuarioRol: "alumno",
        curso: clase.curso,
        materia: clase.materia,
        profesor: clase.profesor,
        dia: clase.dia,
        horaInicio: clase.horaInicio,
        horaFin: clase.horaFin,
        fechaMarca: new Date(),
        tipo: "presente",
      });
      alert("Asistencia registrada ✅");
    } catch (err) {
      console.error("Error presente:", err);
      alert("No se pudo registrar asistencia.");
    }
  };

  if (cargando) return <p>Cargando horarios...</p>;
  if (!horarios.length) return <p>No hay horarios para tu curso.</p>;

  return (
    <div className="table-container alumno-view">
      <h2 className="titulo-curso">Horario – {alumnoDoc?.curso}</h2>

      <div className="horario-list">
        {horarios.map((h) => (
          <div key={h.id} className="bloque-horario">
            <div className="bloque-inner">
              <div className="materia">{h.materia}</div>
              <div className="profesor">👨‍🏫 {h.profesor}</div>
              <div className="hora">
                🕒 {h.horaInicio} — {h.horaFin} ({h.dia})
              </div>
              <div style={{ marginTop: 8 }}>
                <button
                  className="btn-presentismo"
                  onClick={() => marcarAsistencia(h)}
                >
                  Marcar Asistencia
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// src/componentes/AlumnosHorarios.jsx
import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/client";
import { useAuth } from "../context/AuthContext";
import ComunicacionesLista from "./ComunicacionesLista";
import "../disenios/AlumnosHorarios.css";

export default function AlumnosHorarios() {
  const { user } = useAuth();
  const [horarios, setHorarios] = useState([]);
  const [alumnoDoc, setAlumnoDoc] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargar = async () => {
      setCargando(true);

      try {
        if (!user?.email) return;

        // Traer alumno por email
        const alumnosQ = query(
          collection(db, "alumnos"),
          where("email", "==", user.email)
        );
        const snapAlumno = await getDocs(alumnosQ);

        if (snapAlumno.empty) return;

        const alumno = snapAlumno.docs[0].data();
        setAlumnoDoc(alumno);

        // Traer horarios por curso
        const hQuery = query(
          collection(db, "horarios"),
          where("curso", "==", alumno.curso)
        );

        const snapHorarios = await getDocs(hQuery);
        const docs = snapHorarios.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));

        setHorarios(docs);
      } catch (e) {
        console.error("Error cargando horarios:", e);
      } finally {
        setCargando(false);
      }
    };

    cargar();
  }, [user]);

  if (cargando) return <p>Cargando horarios...</p>;
  if (!alumnoDoc) return <p>No se encontró la información del alumno.</p>;
  if (!horarios.length) return <p>No hay horarios para tu curso.</p>;

  // Agrupar horarios por día
  const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
  const columna = {};

  dias.forEach((dia) => {
    columna[dia] = horarios.filter((h) => h.dia === dia);
  });

return (
  <div className="alumnos-horarios-container">
    <ComunicacionesLista curso={alumnoDoc.curso} />
    <h2 className="alumnos-horarios-titulo">
      Horario – {alumnoDoc.curso}
    </h2>

    <div className="alumnos-horarios-grid">
      {/* Encabezados */}
      {dias.map((d) => (
        <div key={d} className="alumnos-dia-header">
          {d}
        </div>
      ))}

      {dias.map((dia) => (
        <div key={dia} className="alumnos-dia-columna">
          {columna[dia].map((h) => (
            <div className="celda-horario" key={h.id}>
              <strong>{h.materia}</strong><br />
              {h.horaInicio} – {h.horaFin}<br />
              {h.profesor}
            </div>
          ))}
        </div>
      ))}
    </div>
  </div>
);
}

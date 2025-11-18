import React, { useEffect, useState } from "react";
import AlumnosHorarios from "../componentes/AlumnosHorarios";
import { useAuth } from "../context/AuthContext";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/client";
import "../disenios/Alumnos.css";

export default function Alumnos() {
  const { user } = useAuth();
  const [alumno, setAlumno] = useState(null);
  const [preceptor, setPreceptor] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarInfo = async () => {
      setCargando(true);

      try {
        if (!user?.uid) {
          setCargando(false);
          return;
        }

        // ✅ Traer alumno directamente por UID
        const alumnoSnap = await getDoc(doc(db, "alumnos", user.uid));
        if (!alumnoSnap.exists()) {
          setAlumno(null);
          setCargando(false);
          return;
        }

        const alumnoData = alumnoSnap.data();
        setAlumno(alumnoData);

        // Buscar preceptores del turno del alumno
        const preceptoresQ = query(
          collection(db, "preceptores"),
          where("turno", "==", alumnoData.turno || "")
        );
        const preSnap = await getDocs(preceptoresQ);

        preSnap.forEach((docu) => {
          const p = docu.data();
          if (p.cursos?.includes(alumnoData.curso)) {
            setPreceptor(p);
          }
        });
      } catch (err) {
        console.error("Error cargar datos alumno:", err);
      } finally {
        setCargando(false);
      }
    };

    cargarInfo();
  }, [user]);

  if (cargando) return <p>Cargando datos...</p>;
  if (!user) return <p>No has iniciado sesión.</p>;
  if (!alumno) return <p>No se encontró información del alumno.</p>;

  return (
    <div className="alumnos-container">
      <h2>
        Bienvenido,{" "}
        <strong>
          {alumno.nombreyapellido || alumno.nombre || user.displayName || user.email}
        </strong>
      </h2>

      <p>
        <strong>Curso:</strong> {alumno.curso} —{" "}
        <strong>Turno:</strong> {alumno.turno || "—"}
      </p>

      {preceptor && (
        <p>
          <strong>Preceptor:</strong> {preceptor.nombre}
        </p>
      )}

      <h3>Horario del curso</h3>

      <AlumnosHorarios curso={alumno.curso} />
    </div>
  );
}
/*

jere@gmail.com 1111111 62da
franco@gmail.com 1111111 63ra
lucia@gmail.com 1111111 61ra no


*/
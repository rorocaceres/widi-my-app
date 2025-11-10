import React, { useEffect, useState } from "react";
import ScheduleTable from "../componentes/ScheduleTable";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase/client";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import "../disenios/Alumnos.css";

function Alumnos() {
  const { user } = useAuth();
  const [horarios, setHorarios] = useState([]);
  const [preceptor, setPreceptor] = useState(null);
  const [alumno, setAlumno] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerDatos = async () => {
      if (!user) return;

      try {
        // Traer datos del alumno
        const alumnoRef = doc(db, "alumnos", user.uid);
        const alumnoSnap = await getDoc(alumnoRef);

        if (!alumnoSnap.exists()) {
          console.warn("No se encontró el alumno.");
          setCargando(false);
          return;
        }

        const datosAlumno = alumnoSnap.data();
        setAlumno(datosAlumno);

        const { curso, turno } = datosAlumno;

        // Buscar su preceptor
        const preceptoresRef = collection(db, "preceptores");
        const q = query(preceptoresRef, where("turno", "==", turno));
        const querySnap = await getDocs(q);

        let preceptorEncontrado = null;
        querySnap.forEach((docu) => {
          const data = docu.data();
          if (data.cursos && data.cursos.includes(curso)) {
            preceptorEncontrado = data;
          }
        });

        setPreceptor(preceptorEncontrado);

        // Traer horarios del curso
        const horarioRef = doc(db, "horarios", `${curso}_${turno}`);
        const horarioSnap = await getDoc(horarioRef);

        if (horarioSnap.exists()) {
          setHorarios(horarioSnap.data().materias || []);
        } else {
          setHorarios([]);
        }
      } catch (error) {
        console.error("Error al obtener datos del alumno:", error);
      } finally {
        setCargando(false);
      }
    };

    obtenerDatos();
  }, [user]);

  if (cargando) return <p>Cargando tus datos...</p>;
  if (!user) return <p>No has iniciado sesión.</p>;
  if (!alumno) return <p>No se encontraron tus datos en el sistema.</p>;

  return (
    <div className="alumnos-container">
      <h2>Bienvenido, {alumno.nombreyapellido || user.email}</h2>
      <p><strong>Curso:</strong> {alumno.curso} — <strong>Turno:</strong> {alumno.turno}</p>

      {preceptor ? (
        <p><strong>Preceptor asignado:</strong> {preceptor.nombre}</p>
      ) : (
        <p>No se encontró un preceptor asignado a tu curso.</p>
      )}

      <h3>Horario del curso</h3>
      {horarios.length > 0 ? (
        <ScheduleTable datos={horarios} />
      ) : (
        <p>No hay horarios registrados todavía.</p>
      )}
    </div>
  );
}

export default Alumnos;




/*import React, { useEffect, useState } from "react";
import ScheduleTable from "../componentes/ScheduleTable";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase/client";
import { doc, getDoc } from "firebase/firestore";
import "../disenios/Alumnos.css";

function Alumnos() {
  const { user } = useAuth();
  const [horarios, setHorarios] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerHorarios = async () => {
      if (!user) return;

      try {
        const docRef = doc(db, "alumnos", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setHorarios(docSnap.data().horarios || []);
        } else {
          setHorarios([]);
        }
      } catch (error) {
        console.error("Error al obtener horarios del alumno:", error);
      } finally {
        setCargando(false);
      }
    };

    obtenerHorarios();
  }, [user]);

  if (cargando) return <p>Cargando tus horarios...</p>;

  if (!user) return <p>No has iniciado sesión.</p>;

  return (
    <div className="alumnos-container">
      <h2>Bienvenido, {user.email}</h2>
      <p>Estos son tus horarios asignados:</p>

      {horarios.length > 0 ? (
        <ScheduleTable />
      ) : (
        <p>No hay horarios registrados todavía.</p>
      )}
    </div>
  );
}

export default Alumnos;
*/
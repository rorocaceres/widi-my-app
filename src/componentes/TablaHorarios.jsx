import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../Firebase/client";
import { useAuth } from "../context/AuthContext";
import "../disenios/TablaHorarios.css";

function TablaHorarios() {
  const { user } = useAuth(); // usuario logueado
  const [filas, setFilas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [curso, setCurso] = useState(null);

  useEffect(() => {
    const obtenerHorariosPreceptor = async () => {
      try {
        if (!user?.email) return;

        // Buscar preceptor actual
        const preceptorSnap = await getDocs(
          query(collection(db, "preceptores"), where("email", "==", user.email))
        );

        if (preceptorSnap.empty) {
          console.warn("No se encontró el preceptor con ese email.");
          setCargando(false);
          return;
        }

        const preceptorData = preceptorSnap.docs[0].data();
        setCurso(preceptorData.curso);

        // Buscar horarios correspondientes a ese curso
        const horariosSnap = await getDocs(
          query(collection(db, "horarios"), where("curso", "==", preceptorData.curso))
        );

        const horarios = horariosSnap.docs.map((doc) => doc.data());
        setFilas(horarios);
      } catch (error) {
        console.error("Error al obtener horarios:", error);
      } finally {
        setCargando(false);
      }
    };

    obtenerHorariosPreceptor();
  }, [user]);

  if (cargando) return <p>Cargando horarios...</p>;
  if (!curso) return <p>No se encontró información del curso asignado.</p>;

  const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

  // Agrupar por día y ordenar por hora
  const horariosPorDia = dias.map((dia) => ({
    dia,
    clases: filas
      .filter((f) => f.dia === dia)
      .sort((a, b) => a.horaInicio.localeCompare(b.horaInicio)),
  }));

  return (
    <div className="table-container">
      <h2>Horario semanal - {curso}</h2>

      <table className="tabla-horarios">
        <thead>
          <tr>
            {dias.map((d, i) => (
              <th key={i}>{d}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {horariosPorDia.map(({ dia, clases }) => (
              <td key={dia} className="align-top">
                {clases.length > 0 ? (
                  clases.map((c, i) => (
                    <div key={i} className="bloque-horario">
                      {/* Primero la materia */}
                      <strong>{c.materia}</strong><br />
                      {/* Luego el horario */}
                      {c.horaInicio} - {c.horaFin}<br />
                      {/* Por último el profesor */}
                      <span className="profesor">{c.profesor}</span>
                    </div>
                  ))
                ) : (
                  <span className="vacio">—</span>
                )}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default TablaHorarios;

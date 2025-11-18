import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, query, where, addDoc } from "firebase/firestore";
import { db } from "../firebase/client";
import { useAuth } from "../context/AuthContext";
import "../disenios/TablaHorarios.css";

// 🔹 AGREGADO – importar el formulario de comunicaciones
import ComunicacionesForm from "../componentes/ComunicacionesForm";
import "../disenios/Comunicaciones.css"; // 🔹 CSS de la caja

function TablaHorarios() {
  const { user } = useAuth();
  const [filasPorCurso, setFilasPorCurso] = useState({});
  const [cargando, setCargando] = useState(true);
  const [rol, setRol] = useState(null);
  const [cursosDisponibles, setCursosDisponibles] = useState([]);
  const [cursoSeleccionado, setCursoSeleccionado] = useState("");

  useEffect(() => {
    const obtenerHorarios = async () => {
      try {
        if (!user?.email) return;

        // 🔹 Buscar si es PRECEPTOR
        const preceptorSnap = await getDocs(
          query(collection(db, "preceptores"), where("email", "==", user.email))
        );

        if (!preceptorSnap.empty) {
          setRol("preceptor");
          const preceptorData = preceptorSnap.docs[0].data();

          const cursos = Array.isArray(preceptorData.cursos)
            ? preceptorData.cursos
            : [preceptorData.curso];

          setCursosDisponibles(cursos);
          setCursoSeleccionado(cursos[0]);

          // Cargar horarios por curso
          const horariosPorCurso = {};
          for (const curso of cursos) {
            const snap = await getDocs(
              query(collection(db, "horarios"), where("curso", "==", curso))
            );

            horariosPorCurso[curso] = snap.docs.map((doc) => doc.data());
          }

          setFilasPorCurso(horariosPorCurso);
          setCargando(false);
          return;
        }

        // 🔹 Buscar si es PROFESOR
        const profesorSnap = await getDocs(
          query(collection(db, "profesores"), where("email", "==", user.email))
        );

        if (!profesorSnap.empty) {
          setRol("profesor");
          const profesorData = profesorSnap.docs[0].data();

          const horariosSnap = await getDocs(
            query(collection(db, "horarios"), where("profesor", "==", profesorData.nombre))
          );

          const horarios = horariosSnap.docs.map((doc) => doc.data());

          const agrupado = horarios.reduce((acc, h) => {
            if (!acc[h.curso]) acc[h.curso] = [];
            acc[h.curso].push(h);
            return acc;
          }, {});

          setFilasPorCurso(agrupado);
          setCursosDisponibles(Object.keys(agrupado));
          setCursoSeleccionado(Object.keys(agrupado)[0]);
        }

      } catch (error) {
        console.error("Error al obtener horarios:", error);
      } finally {
        setCargando(false);
      }
    };

    obtenerHorarios();
  }, [user]);

  // 🔹 Registrar presentismo
  const marcarPresentismo = async (clase) => {
    try {
      await addDoc(collection(db, "presentismo"), {
        profesor: clase.profesor,
        curso: clase.curso,
        materia: clase.materia,
        dia: clase.dia,
        horaInicio: clase.horaInicio,
        fecha: new Date(),
        presente: true,
      });
      alert(`Se registró presentismo para ${clase.profesor}`);
    } catch (error) {
      console.error("Error al registrar presentismo:", error);
    }
  };

  if (cargando) return <p>Cargando horarios...</p>;
  if (!Object.keys(filasPorCurso).length)
    return <p>No se encontraron horarios para este usuario.</p>;

  const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
  const filas = filasPorCurso[cursoSeleccionado] || [];

  const horariosPorDia = dias.map((dia) => ({
    dia,
    clases: filas.filter((f) => f.dia === dia)
      .sort((a, b) => a.horaInicio.localeCompare(b.horaInicio)),
  }));

  return (
    <div className="table-container">

      <h2 className="titulo-curso">Horario</h2>

      {/* 🔹 AGREGADO — Caja de comunicaciones SOLO si es preceptor */}
      {rol === "preceptor" && (
      <div className="top-actions">
    <ComunicacionesForm curso={cursoSeleccionado} />
        <Link to="/register-alumno" className="btn-reg-alumno">
          ➕ Registrar Alumno
        </Link>
    </div>
)}


      {/* 🔹 Selector de curso solo si tiene varios */}
      {rol === "preceptor" && cursosDisponibles.length > 1 && (
        <div style={{ marginBottom: "20px" }}>
          <div style={{ marginBottom: "20px" }}>
          </div>

          <label style={{ marginRight: "10px" }}>Seleccioná un curso:</label>
          <select
            value={cursoSeleccionado}
            onChange={(e) => setCursoSeleccionado(e.target.value)}
          >
            {cursosDisponibles.map((curso, i) => (
              <option key={i} value={curso}>
                {curso}
              </option>
            ))}
          </select>
        </div>
      )}

      <h3 className="titulo-curso">Horario – {cursoSeleccionado}</h3>

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
                      <strong>{c.materia}</strong>
                      <br />
                      {c.horaInicio} - {c.horaFin}
                      <br />
                      <span className="profesor">{c.profesor}</span>
                      <br />

                      {/* 🔹 Botón de presentismo solo para preceptores */}
                      {rol === "preceptor" && (
                        <button
                          onClick={() => marcarPresentismo(c)}
                          className="btn-presentismo"
                        >
                          Marcar Presentismo
                        </button>
                      )}
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


/*
ULTI FUNCIONANDO
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, query, where, addDoc } from "firebase/firestore";
import { db } from "../firebase/client";
import { useAuth } from "../context/AuthContext";
import "../disenios/TablaHorarios.css";

function TablaHorarios() {
  const { user } = useAuth();
  const [filasPorCurso, setFilasPorCurso] = useState({});
  const [cargando, setCargando] = useState(true);
  const [rol, setRol] = useState(null);
  const [cursosDisponibles, setCursosDisponibles] = useState([]);
  const [cursoSeleccionado, setCursoSeleccionado] = useState("");

  useEffect(() => {
    const obtenerHorarios = async () => {
      try {
        if (!user?.email) return;

        // 🔹 Buscar si es preceptor
        const preceptorSnap = await getDocs(
          query(collection(db, "preceptores"), where("email", "==", user.email))
        );

        if (!preceptorSnap.empty) {
          setRol("preceptor");
          const preceptorData = preceptorSnap.docs[0].data();

          // Puede tener varios cursos
          const cursos = Array.isArray(preceptorData.cursos)
            ? preceptorData.cursos
            : [preceptorData.curso];

          setCursosDisponibles(cursos);
          setCursoSeleccionado(cursos[0]); // seleccionar primero por defecto

          // Cargar todos los horarios de sus cursos
          const horariosPorCurso = {};
          for (const curso of cursos) {
            const horariosSnap = await getDocs(
              query(collection(db, "horarios"), where("curso", "==", curso))
            );
            horariosPorCurso[curso] = horariosSnap.docs.map((doc) => doc.data());
          }

          setFilasPorCurso(horariosPorCurso);
          setCargando(false);
          return;
        }

        // 🔹 Buscar si es profesor
        const profesorSnap = await getDocs(
          query(collection(db, "profesores"), where("email", "==", user.email))
        );

        if (!profesorSnap.empty) {
          setRol("profesor");
          const profesorData = profesorSnap.docs[0].data();

          const horariosSnap = await getDocs(
            query(collection(db, "horarios"), where("profesor", "==", profesorData.nombre))
          );

          const horarios = horariosSnap.docs.map((doc) => doc.data());

          // Agrupar por curso
          const agrupado = horarios.reduce((acc, h) => {
            if (!acc[h.curso]) acc[h.curso] = [];
            acc[h.curso].push(h);
            return acc;
          }, {});

          setFilasPorCurso(agrupado);
          setCursosDisponibles(Object.keys(agrupado));
          setCursoSeleccionado(Object.keys(agrupado)[0]);
        }
      } catch (error) {
        console.error("Error al obtener horarios:", error);
      } finally {
        setCargando(false);
      }
    };

    obtenerHorarios();
  }, [user]);

  // 🔹 Simulación del marcado de presentismo
  const marcarPresentismo = async (clase) => {
    try {
      await addDoc(collection(db, "presentismo"), {
        profesor: clase.profesor,
        curso: clase.curso,
        materia: clase.materia,
        dia: clase.dia,
        horaInicio: clase.horaInicio,
        fecha: new Date(),
        presente: true,
      });
      alert(`Se registró presentismo para ${clase.profesor}`);
    } catch (error) {
      console.error("Error al registrar presentismo:", error);
    }
  };

  if (cargando) return <p>Cargando horarios...</p>;
  if (!Object.keys(filasPorCurso).length)
    return <p>No se encontraron horarios para este usuario.</p>;

  const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
  const filas = filasPorCurso[cursoSeleccionado] || [];

  const horariosPorDia = dias.map((dia) => ({
    dia,
    clases: filas
      .filter((f) => f.dia === dia)
      .sort((a, b) => a.horaInicio.localeCompare(b.horaInicio)),
  }));

  return (
    <div className="table-container">
      <h2 className="titulo-curso">Horario</h2>

      {rol === "preceptor" && cursosDisponibles.length > 1 && (
        <div style={{ marginBottom: "20px" }}>
                <div style={{ marginBottom: "20px" }}>
          <Link to="/register-alumno" className="btn-reg-alumno">
            ➕ Registrar Alumno
          </Link>
        </div>

          <label style={{ marginRight: "10px" }}>Seleccioná un curso:</label>
          <select
            value={cursoSeleccionado}
            onChange={(e) => setCursoSeleccionado(e.target.value)}
          >
            {cursosDisponibles.map((curso, i) => (
              <option key={i} value={curso}>
                {curso}
              </option>
            ))}
          </select>
        </div>
      )}

      <h3 className="titulo-curso">Horario – {cursoSeleccionado}</h3>

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
                      <strong>{c.materia}</strong>
                      <br />
                      {c.horaInicio} - {c.horaFin}
                      <br />
                      <span className="profesor">{c.profesor}</span>
                      <br />

                      {rol === "preceptor" && (
                        <button
                          onClick={() => marcarPresentismo(c)}
                          className="btn-presentismo"
                        >
                          Marcar Presentismo
                        </button>
                      )}
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
*/
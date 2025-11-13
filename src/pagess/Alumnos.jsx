import React, { useEffect, useState } from "react";
import AlumnosHorarios from "../componentes/AlumnosHorarios";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase/client";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import "../disenios/Alumnos.css";

export default function Alumnos() {
  const { user } = useAuth();
  const [alumno, setAlumno] = useState(null);
  const [preceptor, setPreceptor] = useState(null);
  const [avisos, setAvisos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      if (!user) {
        setCargando(false);
        return;
      }
      try {
        // traer doc alumno por uid
        const alumnoRef = doc(db, "alumnos", user.uid);
        const alumnoSnap = await getDoc(alumnoRef);
        if (!alumnoSnap.exists()) {
          // fallback: buscar por email si no está documentado por uid
          const q = await getDocs(query(collection(db, "alumnos"), where("email", "==", user.email)));
          if (!q.empty) {
            setAlumno(q.docs[0].data());
          } else {
            setAlumno(null);
          }
        } else {
          setAlumno(alumnoSnap.data());
        }

        const datosAlumno = alumnoSnap.exists() ? alumnoSnap.data() : (alumno || {});
        const curso = datosAlumno?.curso;
        const turno = datosAlumno?.turno;

        // buscar preceptor por turno y cursos que incluya el curso del alumno
        const preSnap = await getDocs(query(collection(db, "preceptores"), where("turno", "==", turno)));
        preSnap.forEach((d) => {
          const p = d.data();
          if (p.cursos?.includes(curso)) setPreceptor(p);
        });

        // buscar avisos targetCurso in [curso, 'all']
        if (curso) {
          const avisosQ = query(collection(db, "avisos"), where("targetCurso", "in", [curso, "all"]));
          const avisosSnap = await getDocs(avisosQ);
          setAvisos(avisosSnap.docs.map(d => ({ id: d.id, ...d.data() })));
        } else {
          setAvisos([]);
        }
      } catch (err) {
        console.error("Error en Alumnos:", err);
      } finally {
        setCargando(false);
      }
    };

    cargarDatos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (cargando) return <p>Cargando datos...</p>;
  if (!user) return <p>No has iniciado sesión.</p>;
  if (!alumno) return <p>No se encontró información del alumno.</p>;

  return (
    <div className="alumnos-container">
      <h2>
        Bienvenido,{" "}
        <strong>{alumno?.nombreyapellido || alumno?.nombre || user.displayName || user.email}</strong>
      </h2>

      <p><strong>Curso:</strong> {alumno.curso} — <strong>Turno:</strong> {alumno.turno}</p>
      {preceptor && <p><strong>Preceptor:</strong> {preceptor.nombre}</p>}

      <h3>Horario del curso (completo)</h3>
      <AlumnosHorarios />

      <div className="buzon">
        <h3>Buzón de avisos</h3>
        {avisos.length > 0 ? (
          <ul>
            {avisos.map(a => (
              <li key={a.id}>
                <strong>{a.titulo}</strong><br />
                {a.mensaje}<br />
                <small>{a.createdAt?.toDate?.().toLocaleString?.() || ""}</small>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay avisos para tu curso.</p>
        )}
      </div>
    </div>
  );
}



/* ulti 13/11
import React, { useEffect, useState } from "react";
import ScheduleTable from "../componentes/ScheduleTable";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase/client";
import { doc, getDoc, collection, query, where, getDocs, setDoc, doc as docRef, serverTimestamp, addDoc, getDocFromCache } from "firebase/firestore";
import "../disenios/Alumnos.css";

function parseTimeToDate(dayStr, timeStr) {
  const [hh, mm] = (timeStr || "00:00").split(":").map(Number);
  const now = new Date();
  now.setHours(hh, mm, 0, 0);
  return now;
}

function minutesDiff(dateA, dateB) {
  return Math.floor((dateA - dateB) / 60000);
}

function Alumnos() {
  const { user } = useAuth();
  const [alumno, setAlumno] = useState(null);
  const [horarios, setHorarios] = useState([]); // array de objetos por materia con dias
  const [preceptor, setPreceptor] = useState(null);
  const [avisos, setAvisos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [marcando, setMarcando] = useState(false);

  useEffect(() => {
    const fetchAll = async () => {
      if (!user) {
        setCargando(false);
        return;
      }

      try {
        // 1) traer alumno
        const alumnoSnap = await getDoc(doc(db, "alumnos", user.uid));
        if (!alumnoSnap.exists()) {
          setAlumno(null);
          setCargando(false);
          return;
        }
        const datosAlumno = alumnoSnap.data();
        setAlumno(datosAlumno);

        const curso = datosAlumno.curso;
        const turno = datosAlumno.turno;

        // 2) traer preceptor (por turno y courses array-contains)
        const preQuery = query(collection(db, "preceptores"), where("turno", "==", turno));
        const preSnap = await getDocs(preQuery);
        let preFind = null;
        preSnap.forEach((pdoc) => {
          const p = pdoc.data();
          if (Array.isArray(p.cursos) && p.cursos.includes(curso)) preFind = p;
        });
        setPreceptor(preFind);

        // 3) traer horarios que coincidan con curso
        const hQuery = query(collection(db, "horarios"), where("curso", "==", curso));
        const hSnap = await getDocs(hQuery);
        const hDocs = hSnap.docs.map(d => d.data());

        // Transformar a formato que espera ScheduleTable (profesor, materia, lunes..viernes)
        const map = {}; // key materia|profesor
        hDocs.forEach(entry => {
          const prof = entry.profesor || "Sin profesor";
          const mat = entry.materia || "Sin materia";
          const dia = (entry.dia || "").toLowerCase(); // 'lunes'
          const horaInicio = entry.horaInicio || entry.hora || "";
          const horaFin = entry.horaFin || "";
          const key = `${prof}|${mat}`;

          if (!map[key]) map[key] = { profesor: prof, materia: mat, lunes: "-", martes: "-", miercoles: "-", jueves: "-", viernes: "-", raw: [] };

          // guardar raw para uso al marcar presentismo
          map[key].raw.push({ dia: dia, horaInicio, horaFin, ...entry });
          // setear columna correspondiente (mostrar horario)
          if (dia.includes("lu")) map[key].lunes = horaInicio ? `${horaInicio} - ${horaFin || ""}` : (entry.hora || "-");
          if (dia.includes("ma")) map[key].martes = horaInicio ? `${horaInicio} - ${horaFin || ""}` : (entry.hora || "-");
          if (dia.includes("mi")) map[key].miercoles = horaInicio ? `${horaInicio} - ${horaFin || ""}` : (entry.hora || "-");
          if (dia.includes("ju")) map[key].jueves = horaInicio ? `${horaInicio} - ${horaFin || ""}` : (entry.hora || "-");
          if (dia.includes("vi")) map[key].viernes = horaInicio ? `${horaInicio} - ${horaFin || ""}` : (entry.hora || "-");
        });

        const filas = Object.values(map);
        setHorarios(filas);

        // 4) traer avisos dirigidos a este curso (+ globales sin curso)
        const avisosQuery = query(collection(db, "avisos"), where("targetCurso", "==", curso));
        const avisosSnap = await getDocs(avisosQuery);
        const avisosLista = avisosSnap.docs.map(d => ({ id: d.id, ...d.data() }));

        // además traer avisos globales
        const avisosGlobalQ = query(collection(db, "avisos"), where("targetCurso", "==", "all"));
        const avisosGlobalSnap = await getDocs(avisosGlobalQ);
        const avisosGlobal = avisosGlobalSnap.docs.map(d => ({ id: d.id, ...d.data() }));

        setAvisos([...avisosLista, ...avisosGlobal]);

        // 5) marcar faltas automáticas para clases ya terminadas (solo si no hay registro)
        // Recorremos cada raw entry y si su horaFin ya pasó, comprobamos presentismo
        const now = new Date();
        for (const fila of Object.values(map)) {
          for (const clase of fila.raw) {
            // require curso+dia+horaInicio para identificar
            if (!clase.horaInicio || !clase.horaFin) continue;
            // Crear fecha de fin (usamos horaFin del día actual)
            const endDate = parseTimeToDate(clase.dia, clase.horaFin);
            // Si ya pasó la hora fin y no existe presentismo, crear falta automática
            if (endDate < now) {
              // check existence
              const presQuery = query(
                collection(db, "presentismo"),
                where("alumnoUid", "==", user.uid),
                where("curso", "==", datosAlumno.curso),
                where("materia", "==", clase.materia || fila.materia),
                where("dia", "==", clase.dia),
                where("horaInicio", "==", clase.horaInicio)
              );
              const presSnap = await getDocs(presQuery);
              if (presSnap.empty) {
                // crear falta automáticamente
                await addDoc(collection(db, "presentismo"), {
                  alumnoUid: user.uid,
                  alumnoNombre: datosAlumno.nombreyapellido || datosAlumno.nombre || user.email,
                  curso: datosAlumno.curso,
                  dia: clase.dia,
                  materia: clase.materia || fila.materia,
                  profesor: clase.profesor || fila.profesor,
                  horaInicio: clase.horaInicio,
                  horaFin: clase.horaFin,
                  estado: "falta", // automatico
                  createdAt: serverTimestamp(),
                  motivo: "auto-falta (no registró presentismo)"
                });
              }
            }
          }
        }

      } catch (err) {
        console.error("Error en Alumnos.fetchAll:", err);
      } finally {
        setCargando(false);
      }
    };

    fetchAll();
  }, [user]);

  const handleMarcarPresentismo = async (fila, claseRaw) => {
    // fila = objeto con profesor,materia, etc; claseRaw contiene dia,horaInicio,horaFin
    if (!user || !alumno) return;
    setMarcando(true);
    try {
      const ahora = new Date();
      // parse hora inicio
      const horaInicioDate = parseTimeToDate(claseRaw.dia, claseRaw.horaInicio);
      const diffMin = minutesDiff(ahora, horaInicioDate); // minutos desde inicio (positivo si ahora > inicio)
      let estado = "presente";

      if (diffMin > 15) estado = "media";
      if (diffMin < -1) {
        // si marca antes de empezar, lo dejamos como presente
        estado = "presente";
      }

      // Guardar presentismo (un documento por marca)
      await addDoc(collection(db, "presentismo"), {
        alumnoUid: user.uid,
        alumnoNombre: alumno.nombreyapellido || alumno.nombre || user.email,
        curso: alumno.curso,
        dia: claseRaw.dia,
        materia: claseRaw.materia || fila.materia,
        profesor: claseRaw.profesor || fila.profesor,
        horaInicio: claseRaw.horaInicio,
        horaFin: claseRaw.horaFin,
        estado,
        createdAt: serverTimestamp()
      });

      // Si guardó como 'media', se deja así; la regla "2 medias -> 1 falta" la podés aplicar en informes (o seimplementa con Cloud Function).
      alert(`Se registró ${estado} para ${fila.profesor || ""}`);
    } catch (err) {
      console.error("Error marcando presentismo:", err);
      alert("Error al registrar presentismo.");
    } finally {
      setMarcando(false);
    }
  };

  // convertir horarios al formato que espera tu ScheduleTable.jsx (prop datos)
  // ScheduleTable espera array de objetos con profesor,materia,lunes..viernes
  if (cargando) return <p>Cargando tus datos...</p>;
  if (!user) return <p>No has iniciado sesión.</p>;
  if (!alumno) return <p>No se encontraron tus datos en el sistema.</p>;

  return (
    <div className="alumnos-container">
      <h2>Bienvenido, {alumno.nombreyapellido || alumno.nombre || user.email}</h2>
      <p><strong>Curso:</strong> {alumno.curso} — <strong>Turno:</strong> {alumno.turno}</p>

      {preceptor ? <p><strong>Preceptor asignado:</strong> {preceptor.nombre}</p> : <p>No se encontró preceptor asignado.</p>}

      <div className="alumnos-grid">
        <div className="alumnos-horario">
          <h3>Horario del curso</h3>

          {horarios.length > 0 ? (
            <>
              {/ ScheduleTable solo dibuja la tabla. Añadimos botones para marcar presentismo debajo de cada celda /}
              <ScheduleTable datos={horarios} />
              <div style={{ marginTop: 12 }}>
                <h4>Marcar presentismo</h4>
                <p>Seleccioná la materia/hora correcta y hacé click.</p>
                {horarios.map((fila, idx) => (
                  <div key={idx} style={{ borderBottom: "1px solid #eee", padding: 8 }}>
                    <strong>{fila.materia} — {fila.profesor}</strong>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 6 }}>
                      { (fila.raw || []).map((clase, i) => (
                        <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                          <div style={{ fontSize: 13 }}>{clase.dia} — {clase.horaInicio} - {clase.horaFin}</div>
                          <button
                            disabled={marcando}
                            onClick={() => handleMarcarPresentismo(fila, { ...clase, materia: fila.materia, profesor: fila.profesor })}
                            className="marcar-btn"
                          >
                            Marcar Presentismo
                          </button>
                        </div>
                      )) }
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p>No hay horarios registrados todavía para tu curso.</p>
          )}
        </div>

        <aside className="alumnos-buzon" style={{ width: 320, marginLeft: 20 }}>
          <h3>Buzón de Avisos</h3>
          {avisos.length > 0 ? (
            <ul>
              {avisos.map(a => (
                <li key={a.id} style={{ marginBottom: 10 }}>
                  <strong>{a.titulo || "Aviso"}</strong>
                  <div style={{ fontSize: 13 }}>{a.mensaje}</div>
                  <div style={{ fontSize: 11, color: "#666" }}>{a.createdAt?.toDate ? a.createdAt.toDate().toLocaleString() : ""}</div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay avisos para tu curso.</p>
          )}
        </aside>
      </div>
    </div>
  );
}

export default Alumnos;

*/



/* ultimo deespude de las 00
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
        // 🔹 Traer datos del alumno
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

        // 🔹 Buscar su preceptor
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

        // 🔹 Buscar horarios del curso (colección “horarios”)
        const horarioRef = doc(db, "horarios", `${curso}_${turno}`);
        const horarioSnap = await getDoc(horarioRef);

        if (horarioSnap.exists()) {
          // se asume que “materias” es un array con profesor, materia y días
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
      <h2>Bienvenido, {alumno.nombre || user.displayName || user.email}</h2>
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

*/

/*
ultimocod 12/11 antesd elas 00
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

        // horarios del curso
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
        <p><strong>Preceptor asignado:</strong> {preceptor.nombre}</p>) :
        (<p>No se encontró un preceptor asignado a tu curso.</p>

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
*/



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
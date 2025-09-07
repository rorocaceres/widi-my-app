import React, { useState, useEffect } from 'react';
import CursosHorariosTabla from '../componentes/CursosHorariosTabla';
import '../disenios/Cursos.css'

export default function Cursos() {
  const [usuarioLogueado, setUsuarioLogueado] = useState(null);
  const [items, setItems] = useState([
    { id: 1, dia: "Lunes", inicio: "08:00", fin: "09:30", turno: "Mañana", profesor: "Ana Gomez", curso: "1°2°", materia: "Matemática" },
    { id: 2, dia: "Lunes", inicio: "09:30", fin: "11:00", turno: "Mañana", profesor: "Ana Gomez", curso: "1°3°", materia: "Álgebra" },
    { id: 3, dia: "Martes", inicio: "14:00", fin: "15:30", turno: "Tarde", profesor: "Ana Gomez", curso: "2°1°", materia: "Geometría" },
    { id: 4, dia: "Miércoles", inicio: "19:00", fin: "20:30", turno: "Vespertino", profesor: "Ana Gomez", curso: "4°2°", materia: "Matemática Aplicada" },
    { id: 5, dia: "Lunes", inicio: "08:00", fin: "09:30", turno: "Mañana", profesor: "Carlos Rodríguez", curso: "1°3°", materia: "Historia" },
    { id: 6, dia: "Martes", inicio: "14:00", fin: "15:30", turno: "Tarde", profesor: "Carlos Rodríguez", curso: "2°1°", materia: "Geografía" },
    { id: 7, dia: "Martes", inicio: "15:30", fin: "17:00", turno: "Tarde", profesor: "Carlos Rodríguez", curso: "3°2°", materia: "Historia" },
    { id: 8, dia: "Jueves", inicio: "19:00", fin: "20:30", turno: "Vespertino", profesor: "Carlos Rodríguez", curso: "4°1°", materia: "Historia Universal" },
    { id: 9, dia: "Martes", inicio: "08:00", fin: "09:30", turno: "Mañana", profesor: "Maria Perez", curso: "1°3°", materia: "Lengua" },
    { id: 10, dia: "Martes", inicio: "09:30", fin: "11:00", turno: "Mañana", profesor: "Maria Perez", curso: "1°2°", materia: "Literatura" },
    { id: 11, dia: "Jueves", inicio: "14:00", fin: "15:30", turno: "Tarde", profesor: "Maria Perez", curso: "3°2°", materia: "Comunicación Oral" },
    { id: 12, dia: "Viernes", inicio: "19:00", fin: "20:30", turno: "Vespertino", profesor: "Maria Perez", curso: "4°2°", materia: "Gramática" },
    { id: 13, dia: "Miércoles", inicio: "08:00", fin: "09:30", turno: "Mañana", profesor: "Jorge Ramirez", curso: "1°2°", materia: "Inglés" },
    { id: 14, dia: "Miércoles", inicio: "14:00", fin: "15:30", turno: "Tarde", profesor: "Jorge Ramirez", curso: "1°3°", materia: "Inglés Técnico" },
    { id: 15, dia: "Miércoles", inicio: "15:30", fin: "17:00", turno: "Tarde", profesor: "Jorge Ramirez", curso: "4°1°", materia: "Inglés Conversacional" },
    { id: 16, dia: "Viernes", inicio: "19:00", fin: "20:30", turno: "Vespertino", profesor: "Jorge Ramirez", curso: "4°2°", materia: "Inglés Avanzado" },
    { id: 17, dia: "Jueves", inicio: "08:00", fin: "09:30", turno: "Mañana", profesor: "Laura Fernandez", curso: "1°2°", materia: "Biología" },
    { id: 18, dia: "Jueves", inicio: "09:30", fin: "11:00", turno: "Mañana", profesor: "Laura Fernandez", curso: "1°3°", materia: "Ciencias Naturales" },
    { id: 19, dia: "Viernes", inicio: "14:00", fin: "15:30", turno: "Tarde", profesor: "Laura Fernandez", curso: "2°1°", materia: "Química" },
    { id: 20, dia: "Viernes", inicio: "19:00", fin: "20:30", turno: "Vespertino", profesor: "Laura Fernandez", curso: "4°2°", materia: "Biología Celular" },
    { id: 21, dia: "Lunes", inicio: "08:00", fin: "09:30", turno: "Mañana", profesor: "Miguel Torres", curso: "1°2°", materia: "Educación Física" },
    { id: 22, dia: "Martes", inicio: "14:00", fin: "15:30", turno: "Tarde", profesor: "Miguel Torres", curso: "1°3°", materia: "Deportes" },
    { id: 23, dia: "Martes", inicio: "15:30", fin: "17:00", turno: "Tarde", profesor: "Miguel Torres", curso: "2°1°", materia: "Atletismo" },
    { id: 24, dia: "Jueves", inicio: "19:00", fin: "20:30", turno: "Vespertino", profesor: "Miguel Torres", curso: "4°1°", materia: "Educación Física Avanzada" },
    { id: 25, dia: "Lunes a Viernes", inicio: "07:30", fin: "12:30", turno: "Mañana", profesor: "Preceptor Juan", materia: "Asistencia", esPreceptor: true, diasSeparados: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"]},
    { id: 26, dia: "Lunes a Viernes", inicio: "13:00", fin: "18:00", turno: "Tarde", profesor: "Preceptora Marta", materia: "Asistencia", esPreceptor: true, diasSeparados: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"] },
    { id: 27, dia: "Lunes a Viernes", inicio: "18:30", fin: "22:00", turno: "Vespertino", profesor: "Preceptor Luis", materia: "Asistencia", esPreceptor: true, diasSeparados: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"] },
  ]);

 // Filtro de Turno
  const [filtroTurno, setFiltroTurno] = useState('Mañana');

  // Cargar usuario de la sesión
  useEffect(() => {
    try {
      const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));
      if (usuarioGuardado) setUsuarioLogueado(usuarioGuardado);
    } catch (e) {
      console.error("Error al leer usuario de localStorage", e);
      setUsuarioLogueado(null);
    }
  }, []);

  // Acciones por fila
  function manejarAccion(id, accion) {
    setItems(prev =>
      prev.map(item =>
        item.id === id
          ? {
              ...item,
              adelantada: accion.tipo === "adelantar",
              tardeMin: accion.tipo === "tarde" ? 15 : null,
            }
          : item
      )
    );
  }

  // Filtrado de items segun rol + turno seleccionado
  const itemsFiltrados = items.filter(item => {
    const esPreceptor = usuarioLogueado?.rol === 'preceptor';
    const esProfesor  = usuarioLogueado?.rol === 'profesor';

    if (esPreceptor) {
      return item.turno === filtroTurno;
    }
    if (esProfesor) {
      return item.profesor === usuarioLogueado.nombre && item.turno === filtroTurno;
    }
    return false;
  });

  if (!usuarioLogueado) {
    return <p>Cargando información del usuario...</p>;
  }

  return (
    <div>
      <h2>Gestión de Cursos</h2>

      <div  className="container-turnos">
        <strong>Filtrar por Turno: </strong>
        <select
          className="filtroTurno" value={filtroTurno} onChange={(e) => setFiltroTurno(e.target.value)}>
          <option value="Mañana">Mañana</option>
          <option value="Tarde">Tarde</option>
          <option value="Vespertino">Vespertino</option>
        </select>
      </div>

      <CursosHorariosTabla
        mode={usuarioLogueado.rol}
        items={itemsFiltrados}
        allowActions={usuarioLogueado.rol === 'preceptor'}
        onAccion={manejarAccion}
      />
    </div>
  );
}
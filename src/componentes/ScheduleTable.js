import React from 'react';
import HorarioTabla from './HorarioTabla'; // importa el componente unificado

function ScheduleTable() {
  const columnas = ['Profesor', 'Materia', 'Martes', 'Miércoles', 'Jueves'];
  const filas = [
    ['Martínez', 'Matemática', '8:00–10:00', '8:00–18:00', '8:00–10:00'],
    ['Gómez', 'Historia', '10:00–12:00', '10:00–12:00', '10:00–12:00'],
    ['López', 'Química', '8:00–11:00', '8:00–11:00', '8:00–11:10'],
    ['Rodríguez', 'Física', '9:00–11:00', '9:00–11:00', '9:00–11:10'],
  ];

  return <HorarioTabla columnas={columnas} filas={filas} />;
}





export default ScheduleTable;

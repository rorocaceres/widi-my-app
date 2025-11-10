import React from "react";
import HorarioTabla from "./HorarioTabla";

function ScheduleTable({ datos = [] }) {
  if (!datos || datos.length === 0) {
    return <p>No hay datos de horarios disponibles.</p>;
  }

  const columnas = ["Profesor", "Materia", "Lunes","Martes", "Miercoles", "Jueves", "Viernes"];

  const filas = datos.map((h) => [
    h.profesor,
    h.materia,
    h.lunes || "-",
    h.martes || "-",
    h.miercoles || "-",
    h.jueves || "-",
    h.viernes || "-",
  ]);

  return <HorarioTabla columnas={columnas} filas={filas} />;
}

export default ScheduleTable;

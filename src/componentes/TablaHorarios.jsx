import React from "react";
import "./TablaHorario.css";

function TablaHorarios() {
  const columnas = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
  const filas = [
    [
      <><strong>18:00</strong><br />Programación Web<br />Wiedermann</>,
      "", "", "", ""
    ],
    [
      <><strong>19:30 - 20:50</strong><br />Ética<br />Monzano</>,
      "", "", "", ""
    ],
    [
      <><strong>21:00 - 22:20</strong><br />Gestión de Calidad<br />Zeballos</>,
      "", "", "", ""
    ],
  ];

  return (
    <div className="table-container">
      <table className="tabla-horarios">
        <caption>Horario Semanal</caption>
        <thead>
          <tr>
            {columnas.map((col, i) => <th key={i}>{col}</th>)}
          </tr>
        </thead>
        <tbody>
          {filas.map((fila, i) => (
            <tr key={i}>
              {fila.map((celda, j) => <td key={j}>{celda}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TablaHorarios;

// 7. Exportamos el componente para poder usarlo en otras partes de la app
/*import React from 'react';
import './TablaHorarios.css';

function TablaHorarios(props) {
  return (
    <div className="table-container">
      <table className="tabla-horarios">
        <caption>Horario Semanal</caption>
        <thead>
          <tr>
            <th scope="col">Lunes</th>
            <th scope="col">Martes</th>
            <th scope="col">Miércoles</th>
            <th scope="col">Jueves</th>
            <th scope="col">Viernes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>18:00</strong><br />
              Programación Web<br />
              Wiedermann
            </td>
            <td></td><td></td><td></td><td></td>
          </tr>
          <tr>
            <td>
              <strong>19:30 - 20:50</strong><br />
              Ética<br />
              Monzano
            </td>
            <td></td><td></td><td></td><td></td>
          </tr>
          <tr>
            <td>
              <strong>21:00 - 22:20</strong><br />
              Gestión de Calidad<br />
              Zeballos
            </td>
            <td></td><td></td><td></td><td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default TablaHorarios;*/

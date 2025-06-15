import React from 'react';

function ScheduleTable() {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Profesor</th>
            <th>Materia</th>
            <th>Martes</th>
            <th>Miércoles</th>
            <th>Jueves</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Martínez</td>
            <td>Matemática</td>
            <td>8:00–10:00</td>
            <td>8:00–18:00</td>
            <td>8:00–10:00</td>
          </tr>
          <tr>
            <td>Gómez</td>
            <td>Historia</td>
            <td>10:00–12:00</td>
            <td>10:00–12:00</td>
            <td>10:00–12:00</td>
          </tr>
          <tr>
            <td>López</td>
            <td>Química</td>
            <td>8:00–11:00</td>
            <td>8:00–11:00</td>
            <td>8:00–11:10</td>
          </tr>
          <tr>
            <td>Rodríguez</td>
            <td>Física</td>
            <td>9:00–11:00</td>
            <td>9:00–11:00</td>
            <td>9:00–11:10</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ScheduleTable;

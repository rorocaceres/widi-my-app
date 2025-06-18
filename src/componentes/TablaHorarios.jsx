import React from 'react';
import './TablaHorarios.css';


function TablaHorarios(props) {
  return (
    <table>
      <thead>
        <tr>
          <th>Lunes</th>
          <th>Martes</th>
          <th>Miércoles</th>
          <th>Jueves</th>
          <th>Viernes</th>
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
  );
}

export default TablaHorarios;

import React from "react";
import Profile from "./Profile"; // asegura que esté importado

export default function Inicio() {
  return (
    <div className="page-home">
      {/* Contenedor central: tabla de ejemplo */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Hora</th>
              <th>Lunes</th>
              <th>Martes</th>
              <th>Miércoles</th>
              <th>Jueves</th>
              <th>Viernes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>08:00 - 09:00</td>
              <td>Matemática</td>
              <td>Lengua</td>
              <td>Historia</td>
              <td>Física</td>
              <td>Inglés</td>
            </tr>
            <tr>
              <td>09:00 - 10:00</td>
              <td>Química</td>
              <td>Biología</td>
              <td>Geografía</td>
              <td>Matemática</td>
              <td>Educación Física</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Perfil a la derecha */}
      <div className="profile">
        <Profile />
      </div>
    </div>
  );
}

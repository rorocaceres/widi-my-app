import React from 'react';               // 1. Importamos React para poder usar JSX y crear componentes
import HorarioTabla from './HorarioTabla'; // 2. Importamos el componente que muestra la tabla de forma unificada

function TablaHorarios() {               // 3. Definimos el componente funcional TablaHorarios
  // 4. Definimos las columnas que aparecerán en el encabezado de la tabla
  const columnas = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

  // 5. Definimos las filas como un arreglo de arreglos.
  // Cada fila es un arreglo que representa las celdas en orden, 
  // y puede contener HTML en texto (por eso usamos tags <br/> y <strong>)
  const filas = [
    [
      '<strong>18:00</strong><br/>Programación Web<br/>Wiedermann',
      '', '', '', ''
    ],
    [
      '<strong>19:30 - 20:50</strong><br/>Ética<br/>Monzano',
      '', '', '', ''
    ],
    [
      '<strong>21:00 - 22:20</strong><br/>Gestión de Calidad<br/>Zeballos',
      '', '', '', ''
    ],
  ];

  // 6. Retornamos el componente HorarioTabla, pasando las columnas y filas definidas arriba como props
  return <HorarioTabla columnas={columnas} filas={filas} />;
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

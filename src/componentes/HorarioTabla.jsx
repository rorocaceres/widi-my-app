import React from 'react';               // 1. Importamos React para poder usar JSX y crear componentes

import './HorarioTabla.css';             // 2. Importamos el archivo CSS que contiene los estilos de esta tabla

function HorarioTabla({ columnas, filas }) {  // 3. Definimos el componente funcional que recibe dos props: columnas (array) y filas (array de arrays)
  return (
    <div className="table-container">          {/* 4. Contenedor con clase para aplicar padding y scroll horizontal si hace falta */}
      <table className="horario-tabla">        {/* 5. Tabla con clase para estilos específicos */}

        <caption>Horario</caption>              {/* 6. Texto descriptivo para accesibilidad y SEO */}

        <thead>                                {/* 7. Cabecera de la tabla */}
          <tr>                                {/* 8. Fila de encabezados */}
            {columnas.map((col, i) => (      // 9. Recorremos el array columnas para crear un <th> por cada título
              <th key={i} scope="col">{col}</th>  // 10. Cada <th> tiene un key único y atributo scope para accesibilidad
            ))}
          </tr>
        </thead>

        <tbody>                                {/* 11. Cuerpo de la tabla con los datos */}
          {filas.map((fila, i) => (           // 12. Recorremos las filas, cada una es un array con celdas
            <tr key={i}>                       {/* 13. Fila de la tabla con key único */}
              {fila.map((celda, j) => (       // 14. Recorremos las celdas dentro de esa fila
                <td
                  key={j}                     // 15. Cada celda con key único
                  dangerouslySetInnerHTML={{ __html: celda || '' }} // 16. Aquí insertamos el contenido HTML de la celda (para que los <br> funcionen)
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HorarioTabla;               // 17. Exportamos el componente para usarlo en otros lados

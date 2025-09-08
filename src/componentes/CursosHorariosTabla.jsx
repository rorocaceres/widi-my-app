import React from 'react';

const DIAS_ORDEN = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

export default function CursosHorariosTabla({ items, allowActions, onAccion }) {
  // Usamos el rol del usuario para determinar qué columnas mostrar
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const esPreceptor = usuario && usuario.rol === 'preceptor';

  // Función para ordenar los items y manejar los días agrupados
  const renderizarFilas = () => {
    let filas = [];
    items.forEach(item => {
      // Si el item tiene la propiedad 'diasSeparados' significa que viene de los datos de preceptor
      if (item.diasSeparados) {
        item.diasSeparados.forEach(dia => {
          filas.push({ ...item, dia: dia });
        });
      } else {
        // Para los items de profesores, se agregan tal cual
        filas.push(item);
      }
    });

    // Ordena las filas
    return filas.sort((a, b) => {
      const d = DIAS_ORDEN.indexOf(a.dia) - DIAS_ORDEN.indexOf(b.dia);
      if (d !== 0) return d;
      return a.inicio.localeCompare(b.inicio);
    });
  };

  const itemsRenderizar = renderizarFilas();

  return (
    <div className="tabla">
      <table>
        <thead>
          <tr>
            <th>Día</th>
            <th>Hora</th>
            <th>Turno</th>
            {esPreceptor ? <th>Profesor</th> : <th>Materia</th>}
            {esPreceptor && <th>Estado</th>}
            {esPreceptor && allowActions && <th>Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {itemsRenderizar.map((c, index) => (
            <tr key={c.id + '-' + index}>
              <td>{c.dia}</td>
              <td>{c.inicio} - {c.fin}</td>
              <td>{c.turno}</td>
              {esPreceptor ? <td>{c.profesor}</td> : <td>{c.materia}</td>}
              {esPreceptor && (
                <td>
                  {c.falta ? 'Falta' : c.tardeMin ? `Llega tarde ${c.tardeMin} min` : c.adelantada ? 'Adelantada' : 'OK'}
                </td>
              )}
              {esPreceptor && allowActions && (
                <td>
                  <button onClick={() => onAccion(c.id, { tipo: 'adelantar' })}>Adelantar</button>
                  <button onClick={() => onAccion(c.id, { tipo: 'tarde' })}>Tarde</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
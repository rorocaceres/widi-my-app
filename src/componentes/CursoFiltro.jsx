import React from 'react';

export default function CursoFiltro({ turno, setTurno }) {
const turnos = ['Mañana', 'Tarde', 'Vespertino'];
return (
<div className="filtro">
<label>Elegí turno: </label>
<select value={turno} onChange={(e) => setTurno(e.target.value)}>
<option value="">-- Seleccionar --</option>
{turnos.map((t) => (
<option key={t} value={t}>
{t}
</option>
))}
</select>
</div>
);
}
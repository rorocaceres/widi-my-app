import React from 'react';

const CURSOS_POR_TURNO = {
Mañana: ['1°2°', '1°3°'],
Tarde: ['2°1°', '3°2°'],
Vespertino: ['4°1°', '4°2°']
};

export default function CursoLista({ turno, setCursoSeleccionado, allowedCourses }) {
const cursos = CURSOS_POR_TURNO[turno] || [];
const visibles = allowedCourses?.length
? cursos.filter((c) => allowedCourses.includes(c))
: cursos;


if (!turno) return null;


return (
<div className="cursos">
<h3>Turno elegido: {turno}</h3>
{visibles.length === 0 ? (
<p>No tenés cursos asignados en este turno.</p>
) : (
<ul>
{visibles.map((curso) => (
<li key={curso}>
<button onClick={() => setCursoSeleccionado(curso)}>{curso}</button>
</li>
))}
</ul>
)}
</div>
);
}


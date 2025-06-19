import React from "react";
import "./Turnos.css"

const horariosManiana = [
  ["1 1ra", "2 1ra", "3 1ra"],
  ["1 2da", "2 2da", "3 2da"],
  ["1 3ra", "2 3ra", "3 3ra"],
  ["1 4ta", "2 4ta", "3 4ta"]
];

const horariosTarde = [
    ["1 1ra", "2 1ra", "3 1ra"],
    ["1 2da", "2 2da", "3 2da"],
    ["1 3ra", "2 3ra", "3 3ra"],
    ["1 4ta", "2 4ta", "3 4ta"]
  ];

  const horariosVespertino = [
    ["4 1ra", "5 1ra", "6 1ra"],
    ["4 2da", "5 2da", "6 2da"],
    ["4 3ra", "5 3ra", "6 3ra"],
    ["4 4ta", "5 4ta", "6 4ta"]
  ];

  const TurnoTabla = ({ titulo, headers, data }) => (
    <div className="mb-12">
      <h2 className="text-center text-lg font-semibold text-[#1F2544] mb-4">{titulo}</h2>
      <table className="w-full border border-[#1F2544]">
        <thead>
          <tr>
            {headers.map((header, i) => (
              <th
                key={i}
                className="border border-[#1F2544] p-2 text-center text-[#1F2544]"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="border border-[#1F2544] p-2 text-center text-[#1F2544]"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
  export default function PantallaTurnos() {
    return (
      <div className="min-h-screen bg-[#f9f4ed] flex">
        {/* Sidebar */}
        <aside className="w-1/5 bg-[#d9d3c7] p-4 text-[#1F2544]">
          <nav className="space-y-4">
            <p className="cursor-pointer">Inicio</p>
            <p className="cursor-pointer">Profesores</p>
            <p className="cursor-pointer">Cursos</p>
            <p className="cursor-pointer font-semibold">TURNOS</p>
            <p className="cursor-pointer">Contactos</p>
          </nav>
        </aside>
  
        {/* Contenido principal */}
        <main className="flex-1 p-8">
          <h1 className="text-2xl font-bold text-[#f9f4ed] bg-[#1F2544] p-4 text-center">
            Horario Profesores EPET 20
          </h1>
  
          <TurnoTabla titulo="TURNO MAÑANA" headers={["1ro", "2do", "3ro"]} data={horariosManiana} />
          <TurnoTabla titulo="TURNO TARDE" headers={["1ro", "2do", "3ro"]} data={horariosTarde} />
          <TurnoTabla titulo="TURNO VESPERTINO" headers={["4to", "5to", "6to"]} data={horariosVespertino} />
        </main>
  
        {/* Perfil */}
        <aside className="w-1/5 bg-[#d9d3c7] p-4 text-center text-[#1F2544]">
          <div className="bg-white w-24 h-24 rounded-full mx-auto mb-4"></div>
          <p className="mb-2">Angela</p>
          <button className="bg-[#f9f4ed] border border-[#1F2544] text-[#1F2544] px-3 py-1 rounded-full">
            cerrar sesión
          </button>
        </aside>
      </div>
    );
  }
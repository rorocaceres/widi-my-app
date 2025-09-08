import React from "react";
import "../disenios/Turnos.css";

const TurnoTabla = ({ titulo, headers, data }) => (
  <div className="mb-8">
    <h2 className="text-center text-lg font-semibold text-[#1F2544] mb-4">{titulo}</h2>
    <table className="w-full border border-[#1F2544]">
      <thead>
        <tr>
          {headers.map((h, i) => (
            <th key={i} className="border border-[#1F2544] p-2 text-center">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((fila, i) => (
          <tr key={i}>
            {fila.map((celda, j) => (
              <td key={j} className="border border-[#1F2544] p-2 text-center">{celda}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default function Turnos() {
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

  return (
    <div className="turnos-container">
      <TurnoTabla titulo="TURNO MAÑANA" headers={["1ro","2do","3ro"]} data={horariosManiana} />
      <TurnoTabla titulo="TURNO TARDE" headers={["1ro","2do","3ro"]} data={horariosTarde} />
      <TurnoTabla titulo="TURNO VESPERTINO" headers={["4to","5to","6to"]} data={horariosVespertino} />
    </div>
  );
}

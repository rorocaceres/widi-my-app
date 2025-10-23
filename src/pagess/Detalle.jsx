import React from "react";
import { useParams } from "react-router-dom";

const Detalle = ({ datos }) => {
  const { id } = useParams();
  const item = datos.find((d) => d.id === parseInt(id));

  if (!item) return <p> No se encontró el elemento</p>;

  return (
    <div className="detalle">
      <h2>{item.nombre}</h2>
      <p>{item.descripcion}</p>
      <p><b>Precio:</b> ${item.precio}</p>
    </div>
  );
};

export default Detalle;

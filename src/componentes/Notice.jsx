// src/componentes/Notice.jsx
import React from "react";
import "../disenios/Notice.css";

function Notice({ mensaje }) {
  return (
    <div className="notice">
      <h2> Acceso Denegado</h2>
      <p>{mensaje}</p>
    </div>
  );
}

export default Notice;

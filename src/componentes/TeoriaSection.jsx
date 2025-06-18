import React from "react";
import { Eye } from "lucide-react";

const TeoriaSection = () => {
  return (
    <section className="teoria-section card">
      <h2 className="section-title">Teoria</h2>

      <div className="schedule-block">
        <h3 className="block-title">Horarios de Teoria</h3>
        <ul className="schedule-list">
          <li className="schedule-item">
            <span className="schedule-day">Lunes a Viernes</span>
            <span className="schedule-info">Turno Maniana</span>
          </li>
          <li className="schedule-item">
            <span className="schedule-day">Lunes a Viernes</span>
            <span className="schedule-info">Turno Tarde</span>
          </li>
        </ul>
        <button className="view-button">
          <Eye size={20} />
          Ver Horario Completo
        </button>
      </div>
    </section>
  );
};

export default TeoriaSection;
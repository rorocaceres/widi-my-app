import React from "react";
import { Eye } from "lucide-react";

const TallerSection = () => {
  return (
    <section className="talleres-section card">
      <h2 className="section-title">Talleres</h2>

      {/* Horarios de Talleres */}
      <div className="schedule-block">
        <h3 className="block-title">Horarios de Talleres</h3>
        <ul className="schedule-list">
          <li className="schedule-item">
            <span className="schedule-day">Lunes y Miercoles</span>
            <span className="schedule-info">Carpinteria Perez</span>
          </li>
          <li className="schedule-item">
            <span className="schedule-day">Martes y Jueves</span>
            <span className="schedule-info">Profesor Gomez</span>
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

export default TallerSection;
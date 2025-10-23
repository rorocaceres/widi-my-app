import React from "react";
import "./Contacto.css";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Contacto() {
  return (
    <div className="contacto-container">
      <h1 className="contacto-titulo">Contáctenos</h1>

      <div className="contacto-content">
        <div className="contacto-info">
          {/* 🔹 Oficina principal con link a Google Maps */}
          <div className="info-card link-card">
            <a
              href="https://www.google.com/maps/place/Lanín+2020,+Neuquén+Capital,+Neuquén,+Argentina"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MapPin className="info-icon" />
              <h3>NUESTRA OFICINA PRINCIPAL</h3>
              <p>
                Lanín 2020 St<br />
                Argentina - Neuquén Capital, Neuquén 8300
              </p>
            </a>
          </div>

          <div className="info-card">
            <Phone className="info-icon" />
            <h3>NÚMERO DE TELÉFONO</h3>
            <p>
              Tel. (0299) - 4478052
              <br />
              4478052 (llamada gratuita)
            </p>
          </div>

          {/* 🔹 Instagram clickeable */}
          <div className="info-card link-card">
            <a
              href="https://www.instagram.com/epet20educacion/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="info-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              <h3>INSTAGRAM</h3>
              <p>@epet20educacion</p>
            </a>
          </div>

          {/* 🔹 Correo clickeable */}
          <div className="info-card link-card">
            <a
              href="mailto:epet020@neuquen.edu.ar"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Mail className="info-icon" />
              <h3>CORREO ELECTRÓNICO</h3>
              <p>epet020@neuquen.edu.ar</p>
            </a>
          </div>
        </div>

        <div className="contacto-form">
          <form>
            <input type="text" placeholder="Ingrese su nombre" required />
            <input type="email" placeholder="Ingrese un correo válido" required />
            <textarea
              placeholder="Escriba su mensaje aquí..."
              rows="5"
              required
            ></textarea>
            <button type="submit">Enviar</button>
          </form>
        </div>
      </div>
    </div>
  );
}

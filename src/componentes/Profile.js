import React from "react";
import "./profile.css";
import { auth } from "../Firebase/client";

export default function Profile() {
  const user = auth.currentUser; // ✅ Trae el usuario logueado

  return (
    <div className="profile-card">
      <img
        src="https://i.imgur.com/5cKXnEl.png"
        alt="Perfil"
        className="profile-img"
      />
      {/* ✅ Muestra el nombre y correo reales */}
      <h3 className="profile-name">
        {user?.displayName || "Usuario sin nombre"}
      </h3>
      <p className="profile-email">{user?.email || "Sin correo"}</p>
    </div>
  );
}

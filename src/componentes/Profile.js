import React from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    navigate("/login");
  };

  return (
    <div className="profile-card fade-in">
      <img
        src="https://i.imgur.com/5cKXnEl.png"
        alt="Perfil"
        className="profile-img"
      />
      <h3 className="profile-name">Ángela</h3>
      <button className="logout-btn" onClick={handleLogout}>
        Cerrar sesión
      </button>
    </div>
  );
}

export default Profile;

/*import React from 'react';
import './Profile.css';

function Profile({ onLogout }) {
  return (
    <div className="profile-card fade-in">
      <img
        src="https://i.imgur.com/5cKXnEl.png"
        alt="Perfil"
        className="profile-img"
      />
      <h3 className="profile-name">Ángela</h3>
      <button className="logout-btn" onClick={onLogout}>
        Cerrar sesión
      </button>
    </div>
  );
}

export default Profile;
*/
import React from 'react';
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

import React from 'react';

function Profile({ onLogout }) {
  return (
    <div className="profile">
      <img src="https://i.imgur.com/5cKXnEl.png" alt="Perfil" width="80" />
      <h3>Ángela</h3>
      <button onClick={onLogout}>Cerrar sesión</button>
    </div>
  );
}

export default Profile;

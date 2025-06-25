import React from 'react';
import '../App.css'; // Si estás usando las clases de App.css

function Profile() {
  return (
    <div className="profile">
      <img src="https://i.pravatar.cc/150?img=3" alt="Foto de perfil" />
      <h3>Nombre de Usuario</h3>
      <button className="logout">Cerrar sesión</button>
    </div>
  );
}

export default Profile;

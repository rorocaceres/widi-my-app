import React, { useState, useEffect } from "react";
import "./rightSidebar.css";

const RightSidebar = () => {
  // Cargar perfil desde LocalStorage si existe
  const savedProfile = JSON.parse(localStorage.getItem("profile"));
  const [profile, setProfile] = useState(savedProfile || {
    nombre: "Ángela",
    apellido: "Cáceres Turon",
    email: "angela@email.com",
    foto: "https://via.placeholder.com/100",
  });

  const [isEditing, setIsEditing] = useState(false);

  // Guardar en LocalStorage cada vez que cambia el perfil
  useEffect(() => {
    localStorage.setItem("profile", JSON.stringify(profile));
  }, [profile]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // Subir foto desde la computadora
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfile({ ...profile, foto: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    // Ya se guarda automáticamente en LocalStorage por useEffect
  };

  return (
    <div className="profile-card">
      <img className="profile-photo" src={profile.foto} alt="Perfil" />
      {!isEditing ? (
        <>
          <h3>{profile.nombre} {profile.apellido}</h3>
          <p>{profile.email}</p>
          <button className="edit-btn" onClick={() => setIsEditing(true)}>Editar perfil</button>
        </>
      ) : (
        <form className="edit-form" onSubmit={(e) => e.preventDefault()}>
          <input type="text" name="nombre" value={profile.nombre} onChange={handleChange} placeholder="Nombre" />
          <input type="text" name="apellido" value={profile.apellido} onChange={handleChange} placeholder="Apellido" />
          <input type="email" name="email" value={profile.email} onChange={handleChange} placeholder="Email" />
          <input type="file" accept="image/*" onChange={handlePhotoChange} />
          <div className="form-buttons">
            <button type="button" onClick={handleSave}>Guardar</button>
            <button type="button" onClick={() => setIsEditing(false)}>Cancelar</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default RightSidebar;

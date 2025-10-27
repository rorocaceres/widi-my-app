import React, { useEffect, useState } from "react";
import "../disenios/Profile.css";
import { auth } from "../Firebase/client";
import { getFirestore, doc, getDoc } from "firebase/firestore";

export default function Profile() {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const db = getFirestore();

  useEffect(() => {
    const obtenerUsuario = async () => {
      // Esperamos a que Firebase cargue el usuario logueado
      const unsubscribe = auth.onAuthStateChanged(async (user) => {
        if (user) {
          try {
            // Buscamos si el usuario está en profesores
            let docRef = doc(db, "profesores", user.uid);
            let docSnap = await getDoc(docRef);

            // Si no está en profesores, buscamos en preceptores
            if (!docSnap.exists()) {
              docRef = doc(db, "preceptores", user.uid);
              docSnap = await getDoc(docRef);
            }

            // Si encontramos el documento, usamos esos datos
            if (docSnap.exists()) {
              setUsuario(docSnap.data());
            } else {
              // Si no, usamos los datos básicos del auth
              setUsuario({
                nombre: user.displayName || "Usuario sin nombre",
                email: user.email,
              });
            }
          } catch (error) {
            console.error("Error al obtener datos del usuario:", error);
          }
        } else {
          setUsuario(null);
        }
        setLoading(false);
      });

      return () => unsubscribe();
    };

    obtenerUsuario();
  }, [db]);

  if (loading) {
    return <p style={{ textAlign: "center" }}>Cargando perfil...</p>;
  }

  if (!usuario) {
    return <p style={{ textAlign: "center" }}>No hay usuario logueado.</p>;
  }

  return (
    <div className="profile-card">
      <img
        src="https://i.imgur.com/5cKXnEl.png"
        alt="Perfil"
        className="profile-img"
      />
      <h3 className="profile-name">{usuario.nombre}</h3>
      <p className="profile-email">{usuario.email}</p>
    </div>
  );
}

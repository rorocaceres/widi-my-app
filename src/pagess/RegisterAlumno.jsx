import React, { useState } from "react";
import { db, auth } from "../firebase/client";
import { collection, setDoc, doc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import "../disenios/RegisterAlumno.css";
import { Link } from "react-router-dom"; 

export default function RegisterAlumno() {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    curso: "",
    dni: "",
    email: "",
    turno: "",
    activo: true
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const registrarAlumno = async (e) => {
    e.preventDefault();
    try {
      // 1. Crear usuario en Firebase Auth
      const cred = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.dni
      );

      const uid = cred.user.uid;

      await setDoc(doc(db, "alumnos", uid), {
        nombre: form.nombre,
        apellido: form.apellido,
        curso: form.curso,
        dni: form.dni,
        email: form.email,
        turno: form.turno,
        activo: true
      });

      alert("Alumno registrado correctamente ✔");

      setForm({
        nombre: "",
        apellido: "",
        curso: "",
        dni: "",
        email: "",
        turno: "",
        activo: true
      });

    } catch (err) {
      console.error("Error registrando alumno:", err);
      alert("Error al registrar el alumno.");
    }
  };

  return (
    <div className="register-alumno-container">
      <h2>Registrar Alumno</h2>

      <form onSubmit={registrarAlumno} className="form-registro">

        <label>Nombre</label>
        <input type="text" name="nombre" value={form.nombre} onChange={handleChange} required />

        <label>Apellido</label>
        <input type="text" name="apellido" value={form.apellido} onChange={handleChange} required />

        <label>Curso</label>
        <input type="text" name="curso" value={form.curso} onChange={handleChange} required />

        <label>Turno</label>
        <input type="text" name="turno" value={form.turno} onChange={handleChange} />

        <label>DNI</label>
        <input type="text" name="dni" value={form.dni} onChange={handleChange} required />

        <label>Email</label>
        <input type="email" name="email" value={form.email} onChange={handleChange} required />

        <button type="submit" className="btn-guardar">Registrar Alumno</button>
      </form>

      <div style={{ marginTop: "20px" }}>
        <Link to="/horarios">
          <button className="btn-volver">Volver a Horarios</button>
        </Link>
      </div>
    </div>
  );
}

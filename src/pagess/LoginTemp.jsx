import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../disenios/style.css';

export default function LoginTemp() {
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const usuarios = [
    { usuario: 'admin', pass: '1234', rol: 'admin', nombre: 'Administrador' },
    { usuario: 'ana', pass: '1111', rol: 'profesor', nombre: 'Ana Gomez' },
    { usuario: 'carlos', pass: '1111', rol: 'profesor', nombre: 'Carlos Rodríguez' },
    { usuario: 'jorge', pass: '1111', rol: 'profesor', nombre: 'Jorge Ramires' },
    { usuario: 'miguel', pass: '1111', rol: 'profesor', nombre: 'Miguel Torres' },
    { usuario: 'laura', pass: '1111', rol: 'profesor', nombre: 'Laura Fernandez' },
    { usuario: 'maria', pass: '1111', rol: 'profesor', nombre: 'Maria Perez' },
    { usuario: 'juan', pass: '2222', rol: 'preceptor', nombre: 'Preceptor Juan', cursos: ['1°2°', '1°3°'] },
    { usuario: 'marta', pass: '2222', rol: 'preceptor', nombre: 'Preceptora Marta', cursos: ['2°1°', '3°2°'] },
    { usuario: 'luis', pass: '2222', rol: 'preceptor', nombre: 'Preceptor Luis', cursos: ['4°1°', '4°2°'] }
  ];
  const handleLogin = () => {
    const encontrado = usuarios.find(u => u.usuario === user && u.pass === pass);
    if (encontrado) {
      localStorage.setItem("loggedIn", true);
      localStorage.setItem("usuario", JSON.stringify(encontrado));
      navigate("/");
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  };
  return (
    <div className="login">
      <h2>Iniciar Sesión</h2>
      <input
        type="text"
        placeholder="Usuario"
        value={user}
        onChange={(e) => setUser(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
      />
      <button onClick={handleLogin}>Entrar</button>
    </div>
  );
}

/*
      Este codigo esta bien hecho y completo pero falta turno alianar.

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

export default function LoginTemp() {
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  // Lista de usuarios
  const usuarios = [
    { usuario: 'admin', pass: '1234', rol: 'admin', nombre: 'Administrador' },
    { usuario: 'ana', pass: '1111', rol: 'profesor', nombre: 'Ana García' },
    { usuario: 'carlos', pass: '1111', rol: 'profesor', nombre: 'Carlos Rodríguez' },
    { usuario: 'sofia', pass: '1111', rol: 'profesor', nombre: 'Sofía Martínez' },
    { usuario: 'luisa', pass: '1111', rol: 'profesor', nombre: 'Luisa Torres' },
    { usuario: 'javier', pass: '1111', rol: 'profesor', nombre: 'Javier Ríos' },
    { usuario: 'martin', pass: '1111', rol: 'profesor', nombre: 'Martín Gómez' },
    { usuario: 'adrian', pass: '2222', rol: 'preceptor', nombre: 'Adrián Soto', cursos: ['1°2°', '1°3°'] },
    { usuario: 'maria', pass: '2222', rol: 'preceptor', nombre: 'María Eva', cursos: ['2°1°', '3°2°'] },
    { usuario: 'jose', pass: '2222', rol: 'preceptor', nombre: 'José Luis', cursos: ['4°1°', '4°2°'] }
  ];

  const handleLogin = () => {
    const encontrado = usuarios.find(u => u.usuario === user && u.pass === pass);

    if (encontrado) {
      // Guardamos la sesión
      localStorage.setItem("loggedIn", true);
      localStorage.setItem("usuario", JSON.stringify(encontrado));

      navigate("/cursos"); // 🔹 después de loguearse lo manda a Cursos
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="login">
      <h2>Iniciar Sesión</h2>
      <input
        type="text"
        placeholder="Usuario"
        value={user}
        onChange={(e) => setUser(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
      />
      <button onClick={handleLogin}>Entrar</button>
    </div>
  );
}*/

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const handleLogin = () => {
    if (user === "admin" && pass === "1234") {
      navigate("/productos");
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input type="text" placeholder="Usuario" onChange={(e) => setUser(e.target.value)} />
      <input type="password" placeholder="Contraseña" onChange={(e) => setPass(e.target.value)} />
      <button onClick={handleLogin}>Ingresar</button>
    </div>
  );
}

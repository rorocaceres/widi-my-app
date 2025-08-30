#!/bin/bash
set -e

echo " Creando rama y carpetas..."
git checkout -b feature/finalizar-proyecto
mkdir -p src/pages src/styles docs

echo " Creando páginas..."
cat > src/pages/Inicio.jsx << 'EOF'
export default function Inicio() {
  return <h1>Bienvenido a la página de Inicio</h1>;
}
EOF

cat > src/pages/Productos.jsx << 'EOF'
export default function Productos() {
  return <h1>Lista de Productos</h1>;
}
EOF

cat > src/pages/Contacto.jsx << 'EOF'
export default function Contacto() {
  return <h1>Página de Contacto</h1>;
}
EOF

echo " Creando login simulado..."
cat > src/componentes/login.js << 'EOF'
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
EOF

echo " Configurando App.js con React Router..."
cat > src/App.js << 'EOF'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inicio from "./pages/Inicio";
import Productos from "./pages/Productos";
import Contacto from "./pages/Contacto";
import Login from "./componentes/login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
EOF

echo " Creando README.md..."
cat > README.md << 'EOF'
# Proyecto WIDI FAR

## Descripción
Sitio web desarrollado en React con navegación por React Router, login simulado y secciones de ejemplo.

## Integrantes y Roles
- **Ángela del Rosario Cáceres Turán** - Frontend, Documentación.

## Tecnologías usadas
- React
- React Router
- CSS
- GitHub Pages

## Funcionalidades
- Navegación entre páginas
- Login simulado
- Estructura responsive

## Deploy
- GitHub Pages: https://rorocaceres.github.io/Proyecto_widi_FAR/

## Capturas
*(Agregar imágenes o link a Figma en /docs)*
EOF

echo " Creando mockup placeholder..."
cat > docs/mockup.txt << 'EOF'
Aquí irían las capturas de pantalla o el enlace a Figma.
EOF

echo " Instalando dependencias necesarias..."
npm install react-router-dom gh-pages --save

echo " Configurando package.json para deploy..."
npx json -I -f package.json -e 'this.homepage="https://rorocaceres.github.io/Proyecto_widi_FAR"'
npx json -I -f package.json -e 'this.scripts["predeploy"]="npm run build"'
npx json -I -f package.json -e 'this.scripts["deploy"]="gh-pages -d build"'

echo " Commit y push..."
git add .
git commit -m "Implementación final: estructura, router, login, docs y README"
git push -u origin feature/finalizar-proyecto

echo " Listo. Ahora podés hacer:"
echo "npm run deploy"

import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../Firebase/client";
import { onAuthStateChanged } from "firebase/auth";

// ✅ Creamos el contexto de autenticación
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // guarda los datos del usuario logueado

  useEffect(() => {
    // ✅ Escucha el estado de autenticación en tiempo real
    const unsubscribe = onAuthStateChanged(auth, (usuario) => {
      setLoggedIn(!!usuario);
      setUser(usuario); // guardamos el usuario actual
    });

    return () => unsubscribe();
  }, []);

  return (
    // ✅ Exportamos el contexto con loggedIn y user
    <AuthContext.Provider value={{ loggedIn, user }}>
      {children}
    </AuthContext.Provider>
  );
}

// ✅ Hook personalizado para usar la info del usuario logueado
export function useAuth() {
  return useContext(AuthContext);
}

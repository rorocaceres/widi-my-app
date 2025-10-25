import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../Firebase/client";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // ✅ agregado

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usuario) => {
      setLoggedIn(!!usuario);
      setUser(usuario); // ✅ guardamos el usuario actual
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, user }}> {/* ✅ pasamos user */}
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

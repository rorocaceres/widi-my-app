import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../Firebase/client";
import { onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore"; // ✅ agregado

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (usuario) => {
      if (usuario) {
        setLoggedIn(true);

        // ✅ buscamos en Firestore si es profesor o preceptor
        const db = getFirestore();
        let rol = null;

        const profesorDoc = await getDoc(doc(db, "profesores", usuario.uid));
        if (profesorDoc.exists()) {
          rol = "profesor";
        } else {
          const preceptorDoc = await getDoc(doc(db, "preceptores", usuario.uid));
          if (preceptorDoc.exists()) {
            rol = "preceptor";
          }
        }

        setUser({ ...usuario, rol }); // ✅ agregamos el rol
      } else {
        setLoggedIn(false);
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

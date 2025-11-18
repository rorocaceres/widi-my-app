import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase/client";
import { onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (usuario) => {
      if (usuario) {
        setLoggedIn(true);

        const db = getFirestore();
        let rol = null;
        let dataExtra = null;

        // Buscar en profesores
        const profSnap = await getDoc(doc(db, "profesores", usuario.uid));
        if (profSnap.exists()) {
          rol = "profesor";
          dataExtra = profSnap.data();
        }

        // Buscar en preceptores
        const precSnap = await getDoc(doc(db, "preceptores", usuario.uid));
        if (!rol && precSnap.exists()) {
          rol = "preceptor";
          dataExtra = precSnap.data();
        }

        // Buscar en alumnos
        const alumSnap = await getDoc(doc(db, "alumnos", usuario.uid));
        if (!rol && alumSnap.exists()) {
          rol = "alumno";
          dataExtra = alumSnap.data();
        }

        setUser({
          uid: usuario.uid,
          email: usuario.email,
          displayName: usuario.displayName,
          rol,
          ...dataExtra,
        });
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


/*
ULTIMO FUNCIONANDO
import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase/client";
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
*/
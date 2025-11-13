
import { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../firebase/client";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (usuario) => {
      if (usuario) {
        setLoggedIn(true);

        const email = usuario.email.toLowerCase().trim();
        let rol = null;
        let cursoAlumno = null;

        // 🔹 Verificamos en las tres colecciones
        const colecciones = ["profesores", "preceptores", "alumnos"];
        for (const col of colecciones) {
          const q = query(collection(db, col), where("email", "==", email));
          const snap = await getDocs(q);
          if (!snap.empty) {
            rol = col.slice(0, -1); // "profesores" → "profesor"
            const data = snap.docs[0].data();
            if (rol === "alumno") cursoAlumno = data.curso;
            break;
          }
        }

        setUser({ ...usuario, rol, cursoAlumno });
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


/*import { createContext, useContext, useState, useEffect } from "react";
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

        // ✅ buscamos en Firestore si es profesor, preceptor o alumno
        const db = getFirestore();
        let rol = null;

        const profesorDoc = await getDoc(doc(db, "profesores", usuario.uid));
        if (profesorDoc.exists()) {
          rol = "profesor";
        } else {
          const preceptorDoc = await getDoc(doc(db, "preceptores", usuario.uid));
          if (preceptorDoc.exists()) {
            rol = "preceptor";
          } else {
            const alumnoDoc = await getDoc(doc(db, "alumnos", usuario.uid));
            if (alumnoDoc.exists()) {
              rol = "alumno";
            }
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
}*/

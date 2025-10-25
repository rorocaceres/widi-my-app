// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // ✅ agregado para usar Firestore

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBGf8c8PFilJR6yzICLyvqWZge2gplSqow",
  authDomain: "widi-my-app-f1dab.firebaseapp.com",
  projectId: "widi-my-app-f1dab",
  storageBucket: "widi-my-app-f1dab.firebasestorage.app",
  messagingSenderId: "920300071576",
  appId: "1:920300071576:web:666a4f528cf754cfd67eed",
  measurementId: "G-V8P0CYC6LL",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Analytics (opcional)
const analytics = getAnalytics(app);

// Inicializar Authentication y Firestore
export const auth = getAuth(app);
export const db = getFirestore(app); // ✅ agregado para leer/escribir en Firestore

export default app;


import React from "react";
import { useAuth } from "../context/AuthContext";
import Notice from "./Notice";

function ProtectedRoute({ children, roleAllowed }) {
  const { user } = useAuth();

  if (!user) return <Notice mensaje="Debes iniciar sesión para continuar" />;

  if (!roleAllowed.includes(user.rol)) {
    return <Notice mensaje="Acceso denegado: no tienes permisos." />;
  }

  return children;
}

export default ProtectedRoute;


 /* 
 
--rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {


    match /{document=**} {
      allow read, write: if request.auth != null;
    }
    match /profesores/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /preceptores/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /alumnos/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /horarios/{docId} {
      allow read: if request.auth != null;
      allow write: if false; // nadie escribe desde el cliente
    }
    match /presentismo/{docId} {
      allow read, write: if request.auth != null;
    }
  }
}


rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {

    // This rule allows anyone with your Firestore database reference to view, edit,
    // and delete all data in your Firestore database. It is useful for getting
    // started, but it is configured to expire after 30 days because it
    // leaves your app open to attackers. At that time, all client
    // requests to your Firestore database will be denied.
    //
    // Make sure to write security rules for your app before that time, or else
    // all client requests to your Firestore database will be denied until you Update
    // your rules
    match /{document=**} {
      allow read, write: if request.time < timestamp.date(2025, 11, 11);
    }
  }
}
 */
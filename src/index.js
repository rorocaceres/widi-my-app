import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './context/AuthContext'; //  importamos el contexto

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider> {/*  envolvemos toda la app */}
      <App />
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();

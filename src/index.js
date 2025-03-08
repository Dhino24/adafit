import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './iphone.css'; // Assurez-vous qu'il vient APRÈS index.css
import App from './App';

// Point d'entrée React 18
const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Si vous n'utilisez pas les web vitals, supprimez cette ligne
// ou créez une fonction vide pour éviter l'erreur
const reportWebVitals = () => {};
// reportWebVitals();
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import './styles.css'; // Variables CSS et styles globaux
import './index.css'; // Tailwind CSS
import App from './App';
import MenuPage from './MenuPage';
import { SiteDataProvider } from './components/SiteDataContext';
import AdminApp from './admin-dashboard/AdminApp';
import { AuthProvider } from './components/AuthContext';

// === Point d'entrée principal ===
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <SiteDataProvider>
        {window.location.pathname.startsWith('/admin') ? (
          <AuthProvider>
            <AdminApp />
          </AuthProvider>
        ) : window.location.pathname.startsWith('/menu') ? <MenuPage /> : <App />}
      </SiteDataProvider>
    </HelmetProvider>
  </React.StrictMode>
); 
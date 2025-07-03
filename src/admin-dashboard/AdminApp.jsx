import React, { useState } from 'react';
import MenuAdmin from './MenuAdmin';
import GalleryAdmin from './GalleryAdmin';
import HoursAdmin from './HoursAdmin';
import ContactAdmin from './ContactAdmin';
import SiteInfoAdmin from './SiteInfoAdmin';
import AdminLayout from './AdminLayout';
import { ToastProvider } from './ToastContext';
import { useAuth } from "../components/AuthContext";
import AdminLogin from "./AdminLogin";
import { supabase } from "../supabaseClient";

function AdminApp() {
  const { user, loading } = useAuth();
  const [page, setPage] = useState('siteinfo');
  if (loading) return <div>Chargement...</div>;
  if (!user) return <AdminLogin />;
  // Optionnel : restreindre à certains emails
  // const allowedEmails = ["ton@email.com"]; // à personnaliser
  // if (!allowedEmails.includes(user.email)) return <div>Accès refusé.</div>;
  return (
    <ToastProvider>
      <AdminLayout page={page} setPage={setPage}>
        <button onClick={() => supabase.auth.signOut()} style={{position:'absolute',top:10,right:10}}>Se déconnecter</button>
        {page === 'siteinfo' && <SiteInfoAdmin />}
        {page === 'menu' && <MenuAdmin />}
        {page === 'gallery' && <GalleryAdmin />}
        {page === 'hours' && <HoursAdmin />}
        {page === 'contact' && <ContactAdmin />}
        {/* D'autres pages CRUD à venir ici */}
      </AdminLayout>
    </ToastProvider>
  );
}

export default AdminApp; 
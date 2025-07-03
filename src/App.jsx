import React, { useEffect, useState, useRef, Suspense, lazy } from 'react';
import { Helmet } from 'react-helmet-async';
import { initScripts } from './scripts';
import Header from './components/Header';
const AboutSection = lazy(() => import('./components/AboutSection'));
const MenuSection = lazy(() => import('./components/MenuSection'));
const GallerySection = lazy(() => import('./components/GallerySection'));
const OpeningHoursSection = lazy(() => import('./components/OpeningHoursSection'));
const ContactSection = lazy(() => import('./components/ContactSection'));
const ReservationModal = lazy(() => import('./components/ReservationModal'));
const Footer = lazy(() => import('./components/Footer'));
const MenuPageComponent = lazy(() => import('./components/MenuPageComponent'));
const InfoSideMenu = lazy(() => import('./components/InfoSideMenu'));
import { useSiteData } from './components/SiteDataContext';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { AuthProvider } from "./components/AuthContext";

// Hook utilitaire pour détecter la largeur d'écran
const useIsMdOrSmaller = () => {
  const [isSmall, setIsSmall] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const onResize = () => setIsSmall(window.innerWidth <= 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return isSmall;
};

// Squelette visuel pour le header (LCP)
function HeaderSkeleton() {
  return (
    <header className="relative min-h-screen flex flex-col justify-center items-center text-center bg-gradient-to-b from-primary to-secondary animate-pulse">
      <div className="absolute inset-0 bg-gray-200 opacity-30" />
      <div className="flex flex-col items-center justify-center h-full pt-32 pb-16 z-10">
        <div className="h-12 w-64 rounded bg-gray-300 mb-4" />
        <div className="h-6 w-48 rounded bg-gray-200 mb-8" />
        <div className="h-12 w-40 rounded-full bg-gray-300" />
      </div>
    </header>
  );
}

function AppContent() {
  useEffect(() => {
    initScripts();
    AOS.init({ duration: 900, once: true });
  }, []);
  const { name, slogan, about, ville, meta_description, menu, gallery, primaryColor, secondaryColor, headerImage, contact, loading } = useSiteData();
  useEffect(() => { document.title = name; }, [name]);

  // Applique dynamiquement les couleurs du contexte
  useEffect(() => {
    if (primaryColor && secondaryColor) {
      document.documentElement.style.setProperty('--primary-color', primaryColor);
      document.documentElement.style.setProperty('--secondary-color', secondaryColor);
    }
  }, [primaryColor, secondaryColor]);

  const [activeMenu, setActiveMenu] = useState('');
  useEffect(() => {
    if (menu && menu.length > 0) {
      setActiveMenu(menu[0].section);
    }
  }, [menu]);

  const [showReservation, setShowReservation] = useState(false);
  const [reservationSent, setReservationSent] = useState(false);
  const reservationRef = useRef();
  const isSmall = useIsMdOrSmaller();
  const [showInfoMenu, setShowInfoMenu] = useState(false);

  const baseUrl = process.env.REACT_APP_SITE_URL || window.location.origin;

  // Gestion ouverture/fermeture modale réservation
  const handleReservationOpen = () => {
    setShowReservation(true);
    setReservationSent(false);
    setTimeout(() => reservationRef.current?.focus(), 100);
  };
  const handleReservationClose = () => setShowReservation(false);
  const handleReservationSubmit = e => {
    e.preventDefault();
    setReservationSent(true);
    setTimeout(() => setShowReservation(false), 1800);
  };

  if (!menu || menu.length === 0) {
    // Squelette header pendant le chargement initial
    return <HeaderSkeleton />;
  }

  return (
    <>
      <Helmet>
        <title>{name} - Restaurant à {ville}</title>
        <meta name="description" content={meta_description || slogan || 'Restaurant moderne, cuisine raffinée, ambiance conviviale.'} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:title" content={`${name} - Restaurant à ${ville}`} />
        <meta property="og:description" content={meta_description || slogan} />
        <meta property="og:image" content={headerImage || '/favicon.ico'} />
        <meta property="og:url" content={baseUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${name} - Restaurant à ${ville}`} />
        <meta name="twitter:description" content={meta_description || slogan} />
        <meta name="twitter:image" content={headerImage || '/favicon.ico'} />
        <link rel="canonical" href={baseUrl + window.location.pathname} />
        {/* Données structurées Schema.org */}
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "Restaurant",
            "name": "${name}",
            "image": "${headerImage || '/favicon.ico'}",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "${contact?.address || ''}",
              "addressLocality": "${ville}",
              "addressCountry": "FR"
            },
            "telephone": "${contact?.phone || ''}",
            "servesCuisine": "Française",
            "url": "${baseUrl}"
          }
        `}</script>
      </Helmet>
      <main className="bg-white text-gray-900 min-h-screen flex flex-col">
        <div className="flex-1 flex flex-col">
          <Header
            restaurantName={name}
            restaurantSlogan={slogan}
            onReservationOpen={handleReservationOpen}
            onBurgerClick={() => setShowInfoMenu(v => !v)}
            isInfoMenuOpen={showInfoMenu}
          />
          <Suspense fallback={<div>Chargement...</div>}>
            <InfoSideMenu
              isOpen={showInfoMenu}
              onClose={() => setShowInfoMenu(false)}
              onReservationOpen={handleReservationOpen}
              restaurantName={name}
            />
            <AboutSection />
            {isSmall ? (
              <MenuPageComponent />
            ) : (
              <MenuSection
                menuData={menu}
                activeMenu={activeMenu}
                onTabClick={setActiveMenu}
              />
            )}
            <GallerySection galleryImages={gallery} />
            <OpeningHoursSection />
            <ContactSection
              onReservationOpen={handleReservationOpen}
              restaurantName={name}
            />
            <ReservationModal
              show={showReservation}
              onClose={handleReservationClose}
              reservationSent={reservationSent}
              onSubmit={handleReservationSubmit}
              reservationRef={reservationRef}
              setReservationSent={setReservationSent}
            />
            <Footer restaurantName={name} />
          </Suspense>
        </div>
      </main>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
} 
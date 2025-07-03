import React, { useEffect, useRef } from 'react';

const HEADER_HEIGHT = 60; // hauteur fixe du header en px

// Menu latéral d'infos pour mobile
const InfoSideMenu = ({ isOpen, onClose, onReservationOpen, restaurantName }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    if (isOpen) menuRef.current?.focus();
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = e => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const asideClass = `fixed right-0 z-50 w-80 max-w-full bg-white shadow-2xl p-8 flex flex-col rounded-l-3xl transition-transform duration-300 ease-in-out
    ${isOpen ? 'translate-x-0' : 'translate-x-full'}
    `;
  const overlayClass = `fixed left-0 right-0 z-40 transition-colors duration-300 backdrop-blur-sm
    ${isOpen ? 'top-0 opacity-60 pointer-events-auto bg-black' : 'opacity-0 pointer-events-none'}
    `;
  const linkClass = 'block text-xl font-semibold text-primary rounded-xl px-4 py-3 mb-2 transition-all hover:bg-gray-100 hover:translate-x-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary';

  // Scroll vers la section correspondante
  const handleNavClick = id => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    onClose();
  };

  return (
    <>
      <div
        className={overlayClass}
        style={{ top: HEADER_HEIGHT, height: `calc(100vh - ${HEADER_HEIGHT}px)` }}
        aria-hidden={!isOpen}
        onClick={onClose}
      />
      <aside
        ref={menuRef}
        style={{ top: HEADER_HEIGHT, height: `calc(100vh - ${HEADER_HEIGHT}px)` }}
        className={asideClass}
        aria-label="Menu principal"
        tabIndex={0}
      >
        <div className="mb-8">
          <div className="text-2xl font-lora font-bold text-primary text-center mb-1">{restaurantName}</div>
          <div className="h-0.5 w-12 bg-gray-200 mx-auto rounded-full mb-2" />
        </div>
        <nav className="flex flex-col flex-1">
          <button type="button" className={linkClass} onClick={() => handleNavClick('about')}>À propos</button>
          <button type="button" className={linkClass} onClick={() => handleNavClick('menu')}>Menu</button>
          <button type="button" className={linkClass} onClick={() => handleNavClick('gallery')}>Galerie</button>
          <button type="button" className={linkClass} onClick={() => handleNavClick('horaires')}>Horaires</button>
          <button type="button" className={linkClass} onClick={() => handleNavClick('contact')}>Contact</button>
        </nav>
        <button
          onClick={() => { onReservationOpen && onReservationOpen(); onClose(); }}
          className="mt-8 w-full text-xl font-bold bg-primary text-white py-3 rounded-2xl shadow hover:bg-secondary transition focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
          aria-label="Réserver une table"
        >
          Réserver
        </button>
      </aside>
    </>
  );
};

export default InfoSideMenu; 
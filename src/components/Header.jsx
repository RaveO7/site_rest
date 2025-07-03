import React from 'react';
import { useSiteData } from './SiteDataContext';

function Header({ restaurantName, restaurantSlogan, onReservationOpen, onBurgerClick, isInfoMenuOpen }) {
  const { headerImage } = useSiteData();

  return (
    <header
      id="main-header"
      className="relative min-h-screen flex flex-col justify-center items-center text-center fade-in"
      data-aos="fade-down"
      style={{ background: 'linear-gradient(to bottom, var(--primary-color), var(--secondary-color))' }}
    >
      {/* Image de fond si elle existe */}
      {headerImage && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            backgroundImage: `url(${headerImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
          aria-hidden="true"
        />
      )}

      <nav className="absolute top-0 left-0 w-full flex justify-between items-center p-4" style={{ zIndex: 2 }}>
        <span className="text-2xl font-lora font-bold text-white">{restaurantName}</span>
        {/* Hamburger pour mobile */}
        <button
          id="hamburger-btn"
          className="sm:hidden flex flex-col gap-1 z-20 group"
          aria-label="Ouvrir le menu infos"
          onClick={onBurgerClick}
        >
          <span className={`block w-8 h-1 bg-white rounded transition-all duration-300 ${isInfoMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-8 h-1 bg-white rounded transition-all duration-300 ${isInfoMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-8 h-1 bg-white rounded transition-all duration-300 ${isInfoMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
        <ul className="hidden sm:flex gap-8 text-white font-semibold">
          <li><button type="button" className="hover:text-secondary transition bg-transparent border-0 p-0 m-0 font-inherit cursor-pointer" onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>À propos</button></li>
          <li><button type="button" className="hover:text-secondary transition bg-transparent border-0 p-0 m-0 font-inherit cursor-pointer" onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}>Menu</button></li>
          <li><button type="button" className="hover:text-secondary transition bg-transparent border-0 p-0 m-0 font-inherit cursor-pointer" onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}>Galerie</button></li>
          <li><button type="button" className="hover:text-secondary transition bg-transparent border-0 p-0 m-0 font-inherit cursor-pointer" onClick={() => document.getElementById('horaires')?.scrollIntoView({ behavior: 'smooth' })}>Horraire</button></li>
          <li><button type="button" className="hover:text-secondary transition bg-transparent border-0 p-0 m-0 font-inherit cursor-pointer" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>Contact</button></li>
          <li><button onClick={onReservationOpen} className="hover:text-secondary transition bg-transparent border-0 p-0 m-0 font-inherit cursor-pointer pop-on-click" aria-label="Réserver une table">Réserver</button></li>
        </ul>
      </nav>
      <div className="flex flex-col items-center justify-center h-full pt-32 pb-16" style={{ zIndex: 2 }}>
        <h1 className="text-5xl md:text-7xl font-lora font-bold text-white drop-shadow-lg mb-4">{restaurantName}</h1>
        <p className="text-xl md:text-2xl text-white font-montserrat mb-8">{restaurantSlogan}</p>
        <button
          type="button"
          className="btn px-8 py-3 bg-secondary  text-[#def4fa] rounded-full font-bold shadow-lg hover:bg-primary transition"
          onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Voir le menu
        </button>
      </div>
    </header>
  );
}

export default Header;

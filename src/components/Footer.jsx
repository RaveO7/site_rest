import React from 'react';

function Footer({ restaurantName }) {
  return (
    <footer className="bg-primary text-white py-6 text-center font-montserrat">
      <p className='fade-in' data-aos="fade-down">&copy; {new Date().getFullYear()} {restaurantName} — Tous droits réservés.</p>
    </footer>
  );
}

export default Footer; 
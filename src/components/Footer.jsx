import React from 'react';

// Pied de page du site
const Footer = ({ restaurantName }) => (
  <footer className="bg-primary text-white py-6 text-center font-montserrat fade-in" data-aos="fade-up">
    <p>&copy; {new Date().getFullYear()} {restaurantName} — Tous droits réservés.</p>
  </footer>
);

export default Footer; 
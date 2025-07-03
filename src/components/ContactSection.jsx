import React from 'react';
import { PhoneIcon, MapPinIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { useSiteData } from './SiteDataContext';

// Section contact du site
const ContactSection = ({ onReservationOpen, restaurantName }) => {
  const { contact } = useSiteData();
  if (!contact || !contact.phone) {
    return <div className="p-8 text-center text-xl">Chargement du contact...</div>;
  }
  return (
    <section id="contact" className="w-4/5 mx-auto py-20 px-4 fade-in" data-aos="fade-up">
      <div className="flex flex-col md:flex-row items-stretch h-full">
        <div className="flex-1 flex flex-col justify-between">
          <h2 className="text-3xl font-lora font-bold mb-8 md:mb-0 text-primary">Contact</h2>
          <ul className="flex flex-col gap-4 text-lg mt-0 md:mt-8 md:ml-2">
            <li className="flex items-center gap-3"><PhoneIcon className="w-6 h-6 text-secondary" /><a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary">{contact.phone}</a></li>
            <li className="flex items-center gap-3"><EnvelopeIcon className="w-6 h-6 text-secondary" /><a href={`mailto:${contact.email}`} className="hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary">{contact.email}</a></li>
            <li className="flex items-center gap-3"><MapPinIcon className="w-6 h-6 text-secondary" />{contact.address}</li>
          </ul>
          <div className="flex gap-6 mt-8 md:ml-2">
            <a href={contact.facebook} aria-label="Facebook" className="text-secondary hover:text-primary transition"><FontAwesomeIcon icon={faFacebook} size="2x" /></a>
            <a href={contact.instagram} aria-label="Instagram" className="text-secondary hover:text-primary transition"><FontAwesomeIcon icon={faInstagram} size="2x" /></a>
          </div>
        </div>
        <div className="flex-1 w-full rounded-xl overflow-hidden shadow-lg border border-gray-200 flex mt-8 md:mt-0">
          <iframe
            title={`Carte - ${restaurantName}`}
            aria-label={`Carte - ${restaurantName}`}
            src={contact.map_url}
            width="100%"
            height="100%"
            className="w-full h-full"
            style={{ border: 0, flex: 1 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default ContactSection; 
import React from 'react';
import { useSiteData } from './SiteDataContext';

// Section "À propos" du site
const AboutSection = () => {
  const { about } = useSiteData();
  return (
    <section id="about" className="max-w-4xl mx-auto py-20 px-4">
      <div className="slide-up" data-aos="fade-up">
        <h2 className="text-3xl font-lora font-bold mb-6 text-primary">À propos</h2>
        <p className="text-lg font-montserrat text-gray-700 leading-relaxed">{about}</p>
      </div>
    </section>
  );
};

export default AboutSection; 
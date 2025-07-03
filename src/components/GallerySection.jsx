import React from 'react';

// Section galerie photo du site
const GallerySection = ({ galleryImages }) => (
  <section id="gallery" className="min-h-screen py-20 px-4">
    <div className="fade-in" data-aos="zoom-in-up">
      <h2 className="text-3xl font-lora font-bold mb-10 text-primary text-center">Galerie</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
        {galleryImages.map((img, i) => (
          <figure key={i} className="relative">
            <img
              src={img.src}
              alt={img.legend}
              width={400}
              height={225}
              loading="lazy"
              className="gallery-img rounded-lg shadow cursor-pointer object-cover w-full h-40 md:h-56 pop-on-click"
              tabIndex={0}
              aria-label={`Agrandir la photo : ${img.legend}`}
              onClick={e => { e.target.classList.add('pop-on-click-animate'); setTimeout(() => e.target.classList.remove('pop-on-click-animate'), 400); }}
            />
            <figcaption className="absolute bottom-2 left-2 right-2 bg-black bg-opacity-50 text-white text-xs rounded px-2 py-1 text-center pointer-events-none">{img.legend}</figcaption>
          </figure>
        ))}
      </div>
      {/* Lightbox */}
      <div id="lightbox" className="lightbox" aria-modal="true" aria-hidden="true" tabIndex={-1}>
        <button id="lightbox-close" className="absolute top-4 right-4 text-white text-3xl" aria-label="Fermer la galerie">&times;</button>
        <img id="lightbox-img" src="" alt="Aperçu" className="rounded-lg" />
      </div>
    </div>
  </section>
);

export default GallerySection; 
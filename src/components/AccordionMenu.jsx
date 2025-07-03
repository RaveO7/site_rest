import React, { useState, useRef } from 'react';
import MenuItemDisplay from './MenuItemDisplay';

// Hook for accordion panel animation
function useAccordionPanelAnimation(isOpen) {
  const ref = useRef(null);
  return [
    ref,
    {
      maxHeight: isOpen ? ref.current?.scrollHeight + 'px' : '0px',
      opacity: isOpen ? 1 : 0,
      overflow: 'hidden',
      transition: 'max-height 0.4s cubic-bezier(.4,0,.2,1), opacity 0.3s',
    },
  ];
}

// Accordion section for a menu
function AccordionMenuSection({ section, isOpen, onToggle }) {
  const [ref, style] = useAccordionPanelAnimation(isOpen);
  return (
    <div className="bg-white rounded-xl shadow border border-primary/20">
      <button
        onClick={() => onToggle(section.section)}
        className="w-full flex justify-between items-center px-6 py-4 font-bold text-lg text-primary focus:outline-none rounded-t-xl transition"
        aria-expanded={isOpen}
        aria-controls={`panel-${section.section}`}
      >
        <span>{section.section}</span>
        <span className="ml-2 w-5 h-5 flex items-center justify-center">
          <span className={`block transition-transform duration-300 ease-in-out relative ${isOpen ? 'rotate-90' : ''}`} style={{ width: 20, height: 20 }}>
            <span className="absolute left-0 top-1/2 w-full h-0.5 bg-current rounded" style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }} />
            <span className="absolute left-0 top-1/2 w-full h-0.5 bg-current rounded" style={{ transform: isOpen ? 'rotate(-45deg)' : 'rotate(90deg)', transition: 'transform 0.3s' }} />
          </span>
        </span>
      </button>
      <div id={`panel-${section.section}`} ref={ref} style={style} className="px-6 pb-4 pt-2" aria-hidden={!isOpen}>
        <div className="grid gap-4">
          {section.items.map((item, i) => (
            <MenuItemDisplay key={i} {...item} className="bg-gray-50 rounded-lg shadow-sm p-4 border-l-2 border-primary/10 hover:shadow-md transition" />
          ))}
        </div>
      </div>
    </div>
  );
}

// Main accordion menu display
function AccordionMenuDisplay({ menuData, title, restaurantName }) {
  // Open "Boissons" by default in late afternoon
  const hour = new Date().getHours();
  let menuOrder = menuData, initialOpenSections = [];
  if (hour >= 16 && hour < 18) {
    const boissons = menuData.find(s => s.section === 'Boissons');
    menuOrder = [boissons, ...menuData.filter(s => s.section !== 'Boissons')];
    initialOpenSections = ['Boissons'];
  }
  const [openSections, setOpenSections] = useState(initialOpenSections);
  const handleToggle = section => setOpenSections(openSections => openSections.includes(section) ? openSections.filter(s => s !== section) : [...openSections, section]);
  return (
    <div id="menu" className="min-h-screen bg-gray-50 flex flex-col justify-center items-center py-8 px-2">
      <div className="h-0" />
      <div className="w-full max-w-2xl mx-auto">
        <div className="mb-6 flex items-center">
          <h1 className="text-3xl font-lora font-bold text-primary flex-1 text-center">{title || restaurantName}</h1>
        </div>
        <h2 className="text-xl font-montserrat text-gray-700 text-center mb-8">Découvrez notre carte</h2>
        <div className="space-y-4">
          {menuOrder.map(section => (
            <AccordionMenuSection
              key={section.section}
              section={section}
              isOpen={openSections.includes(section.section)}
              onToggle={handleToggle}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AccordionMenuDisplay; 
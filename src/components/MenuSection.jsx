import React from 'react';

// Affiche le menu sous forme d'onglets papier
const MenuSection = ({ menuData, activeMenu, onTabClick }) => {
  const activeSection = menuData.find(s => s.section === activeMenu);
  if (!activeSection) {
    return <div className="p-8 text-center text-xl">Aucune section trouvée.</div>;
  }
  return (
    <section id="menu" className="relative py-20 px-2 flex justify-center items-center min-h-screen" style={{ background: "repeating-linear-gradient(135deg, #f9f6f2 0 40px, #f7f3ee 40px 80px)" }}>
      <div className="w-full max-w-3xl mx-auto rounded-2xl shadow-2xl border border-gray-200 bg-[#f9f6f2] p-4 md:p-12 relative overflow-hidden fade-in" data-aos="zoom-in-up">
        <h2 className="text-4xl font-lora font-bold mb-10 text-primary text-center tracking-wide drop-shadow-sm">Menu</h2>
        {/* Onglets papier */}
        <div className="flex overflow-x-auto gap-2 md:gap-4 mb-10 justify-center scrollbar-hide" role="tablist" aria-orientation="horizontal" aria-label="Menu principal">
          {menuData.map(section => (
            <button
              key={section.section}
              id={`tab-${section.section}`}
              onClick={() => onTabClick(section.section)}
              className={`px-6 py-2 font-lora text-lg rounded-b-2xl border border-gray-200 border-t-0 border-x-0 shadow-sm transition-all whitespace-nowrap ${activeMenu === section.section ? 'bg-white border-b-4 border-primary text-primary z-10' : 'bg-[#f7f3ee] text-gray-500 hover:text-primary'}`}
              role="tab"
              aria-selected={activeMenu === section.section}
              aria-controls={`menu-panel-${section.section}`}
              tabIndex={activeMenu === section.section ? 0 : -1}
              style={{ minWidth: 120 }}
            >
              {section.section}
            </button>
          ))}
        </div>
        {/* Plats de la section active façon menu papier */}
        <div
          key={activeMenu}
          className="grid gap-0 animate-fade-in"
          id={`menu-panel-${activeMenu}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeMenu}`}
        >
          {(activeSection.items || []).map((item, i, arr) => (
            <div key={i}>
              <div className="flex flex-col md:flex-row md:items-center justify-between py-6 px-2 md:px-6">
                <div>
                  <span className="font-lora font-semibold text-lg md:text-xl text-gray-900 tracking-wide">{item.name}</span>
                  <span className="block font-montserrat italic text-gray-500 text-sm mt-1">{item.desc}</span>
                </div>
                <span className="font-lora text-primary font-bold text-xl mt-2 md:mt-0 md:ml-6 min-w-[70px] text-right">{item.price}</span>
              </div>
              {i < arr.length - 1 && <div className="w-11/12 mx-auto border-t border-dashed border-gray-300 my-0"></div>}
            </div>
          ))}
        </div>
        {/* Motif décoratif bas */}
        <div className="absolute left-0 right-0 bottom-0 h-6 bg-repeat-x opacity-10 pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'6\' viewBox=\'0 0 100 6\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 3 Q 25 0 50 3 T 100 3\' stroke=\'%23bdb6a3\' stroke-width=\'1.5\' fill=\'none\'/%3E%3C/svg%3E")' }}></div>
      </div>
    </section>
  );
};

export default MenuSection; 
import React from 'react';

// Affiche un plat du menu
const MenuItemDisplay = ({ name, desc, price, className = '', ...props }) => (
  <div className={`flex flex-col md:flex-row md:items-center justify-between ${className}`} {...props}>
    <div>
      <span className="font-lora font-semibold text-lg md:text-xl text-gray-900 tracking-wide">{name}</span>
      <span className="block font-montserrat italic text-gray-500 text-sm mt-1">{desc}</span>
    </div>
    <span className="font-lora text-primary font-bold text-xl mt-2 md:mt-0 md:ml-6 min-w-[70px] text-right">{price}</span>
  </div>
);

export default MenuItemDisplay; 
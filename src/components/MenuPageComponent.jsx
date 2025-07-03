import React from 'react';
import { menuData } from '../constants';
import AccordionMenuDisplay from './AccordionMenu';

// Affiche le menu sous forme d'accordéon (mobile)
function MenuPageComponent() {
  return <AccordionMenuDisplay menuData={menuData} title="Menu" />;
}

export default MenuPageComponent; 
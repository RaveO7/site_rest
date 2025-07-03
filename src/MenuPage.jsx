import React from 'react';
import { useSiteData } from './components/SiteDataContext';
import AccordionMenuDisplay from './components/AccordionMenu';

function MenuPage() {
  const { name, menu } = useSiteData();
  return <AccordionMenuDisplay menuData={menu} restaurantName={name} />;
}

export default MenuPage; 
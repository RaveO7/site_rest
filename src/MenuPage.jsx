import React from 'react';
import { useSiteData } from './components/SiteDataContext';
import AccordionMenuDisplay from './components/AccordionMenu';
import { Helmet } from 'react-helmet-async';

function MenuPage() {
  const { name, menu } = useSiteData();
  return (
    <>
      <Helmet>
        <link rel="canonical" href={window.location.href.split('#')[0].split('?')[0]} />
      </Helmet>
      <AccordionMenuDisplay menuData={menu} restaurantName={name} />
    </>
  );
}

export default MenuPage; 
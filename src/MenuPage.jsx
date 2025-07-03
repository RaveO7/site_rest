import React from 'react';
import { useSiteData } from './components/SiteDataContext';
import AccordionMenuDisplay from './components/AccordionMenu';
import { Helmet } from 'react-helmet-async';

function MenuPage() {
  const { name, menu } = useSiteData();
  const baseUrl = process.env.REACT_APP_SITE_URL || window.location.origin;
  return (
    <>
      <Helmet>
        <link rel="canonical" href={baseUrl + window.location.pathname} />
      </Helmet>
      <AccordionMenuDisplay menuData={menu} restaurantName={name} />
    </>
  );
}

export default MenuPage; 
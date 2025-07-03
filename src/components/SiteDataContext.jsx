import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const SiteDataContext = createContext();

// Provider pour les données du site (infos, menu, galerie, contact, horaires)
export function SiteDataProvider({ children }) {
  const [state, setState] = useState({
    name: '',
    slogan: '',
    about: '',
    ville: '',
    meta_description: '',
    primaryColor: '#4F46E5',
    secondaryColor: '#F59E42',
    menu: [],
    gallery: [],
    contact: {},
    openingHours: [],
    loading: true,
    headerImage: '',
  });

  useEffect(() => {
    const fetchAll = async () => {
      setState(s => ({ ...s, loading: true }));
      // Infos générales
      const { data: infoData } = await supabase.from('site_info').select('*');
      if (infoData && infoData[0]) {
        setState(s => ({
          ...s,
          name: infoData[0].name,
          slogan: infoData[0].slogan,
          about: infoData[0].about,
          ville: infoData[0].ville || '',
          meta_description: infoData[0].meta_description || '',
          primaryColor: infoData[0].primary_color || '#4F46E5',
          secondaryColor: infoData[0].secondary_color || '#F59E42',
          headerImage: infoData[0].header_image || '',
        }));
      }
      // Menu et plats
      const { data: menuRows } = await supabase.from('menu').select('*').order('order', { ascending: true });
      const { data: platsRows } = await supabase.from('plats').select('*').order('order', { ascending: true });
      if (menuRows && platsRows) {
        const menu = menuRows.map(section => ({
          section: section.name,
          items: platsRows.filter(p => p.menu_id === section.id).map(p => ({
            name: p.name,
            desc: p.description,
            price: p.price
          }))
        }));
        setState(s => ({ ...s, menu }));
      }
      // Galerie
      const { data: galleryRows } = await supabase.from('gallery').select('*').order('order', { ascending: true });
      if (galleryRows) setState(s => ({ ...s, gallery: galleryRows }));
      // Contact
      const { data: contactRows } = await supabase.from('contact').select('*');
      if (contactRows && contactRows[0]) setState(s => ({ ...s, contact: contactRows[0] }));
      // Horaires
      const { data: openingRows } = await supabase.from('opening_hours').select('*');
      if (openingRows) setState(s => ({ ...s, openingHours: openingRows }));
      setState(s => ({ ...s, loading: false }));
    };
    fetchAll();
  }, []);

  return <SiteDataContext.Provider value={state}>{children}</SiteDataContext.Provider>;
}

export function useSiteData() {
  return useContext(SiteDataContext);
} 
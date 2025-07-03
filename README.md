# Restaurant Website Template

Ce template React + Tailwind est prêt à l'emploi pour un site de restaurant moderne, épuré et responsive.

## Personnalisation rapide

### 1. Couleurs principales et secondaires
- Ouvrez `src/styles.css`.
- Modifiez les variables CSS en haut du fichier :
  ```css
  :root {
    --primary-color: #4F46E5; /* Couleur principale */
    --secondary-color: #F59E42; /* Couleur secondaire */
  }
  ```

### 2. Nom, slogan et textes
- Ouvrez `src/App.jsx`.
- Modifiez les constantes `restaurantName`, `restaurantSlogan`, et les textes dans les sections « À propos », « Menu », etc.

### 3. Menu (sections et plats)
- Dans `src/App.jsx`, modifiez la constante `menuData` pour ajouter/retirer des sections ou des plats.

### 4. Galerie photos
- Ajoutez vos images dans `public/gallery/` et référencez-les dans la section Galerie du composant.

## Structure du projet
- `public/index.html` : Fichier HTML principal (meta, fonts, favicon)
- `src/App.jsx` : Composant principal React (sections, textes, menu)
- `src/styles.css` : Variables CSS, styles globaux, animations
- `src/scripts.js` : Animations JS (Intersection Observer, lightbox)
- `tailwind.config.js` : Configuration Tailwind (breakpoints, couleurs)

## Dépendances
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Google Fonts](https://fonts.google.com/) (Montserrat, Lora)
- [Heroicons](https://heroicons.com/) (icônes SVG)

## Installation
1. `npm install`
2. `npm start` (dev) ou `npm run build` (prod)

---

**N'hésitez pas à modifier les commentaires dans le code pour guider la personnalisation !** 
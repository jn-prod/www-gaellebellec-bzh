# www.gael-lebellec.bzh

Site personnel de Gaël Le Bellec. Jekyll natif de GitHub Pages depuis `main` : aucune
dépendance, aucun Gemfile, aucun workflow. Ne pas en rajouter. Jekyll 3 : pas de syntaxe propre à la
version 4.

- Textes et traductions : `_data/site.yml`, une clé `fr` et une clé `en`. Pages : `index.html` et
  `en.html`, sur `_layouts/default.html` et `_includes/home.html`.
- Actus, calendrier et résultats : lus dans Google Sheets par le navigateur (`main.js`), onglet `_en`
  pour l'anglais, clé limitée au domaine.
- Newsletter : formulaire Google Forms. Mentions légales : `mentions-legales.html`. Tout nouvel appel à
  un tiers y est déclaré.

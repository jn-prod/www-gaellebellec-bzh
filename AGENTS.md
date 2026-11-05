# www.gael-lebellec.bzh

Site personnel de Gaël Le Bellec, maintenu gratuitement par Nicolas. Jekyll construit par
`actions/jekyll-build-pages` (`.github/workflows/pages.yml`) : aucune dépendance, aucun Gemfile. Ne pas
en rajouter. Jekyll 3 : pas de syntaxe propre à la version 4.

- Textes et traductions : `_data/site.yml`, une clé `fr` et une clé `en`. Pages : `index.html` et
  `en.html`, sur `_layouts/default.html` et `_includes/home.html`.
- Actus, calendrier et résultats : lus dans Google Sheets par le navigateur (`main.js`), onglet `_en`
  pour l'anglais. La clé est publique, seul son referer la restreint.
- Newsletter : formulaire Google Forms.

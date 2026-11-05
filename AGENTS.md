# www.gael-lebellec.bzh

Site personnel de Gaël Le Bellec. Jekyll construit par
`actions/jekyll-build-pages` (`.github/workflows/pages.yml`) : aucune dépendance, aucun Gemfile. Ne pas
en rajouter. Jekyll 3 : pas de syntaxe propre à la version 4.

- Textes et traductions : `_data/site.yml`, une clé `fr` et une clé `en`. Pages : `index.html` et
  `en.html`, sur `_layouts/default.html` et `_includes/home.html`.
- Actus, calendrier et résultats : lus par le navigateur dans l'export CSV public de la feuille Google
  (`main.js`), onglet `_en` pour l'anglais, sans clé. La feuille doit rester partagée en lecture. Attention : l'export déduit le type de chaque colonne, un
  texte isolé dans une colonne de nombres ou de dates peut sortir vide.
- Newsletter : formulaire Google Forms.

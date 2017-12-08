# Gael Le Bellec, Athlète Portfolio

Gael Le Bellec is a two times duathlon wold champion. The project is his portfolio.

### Simple HTML5 static website 

The theme use "Bootstrap 4" and "Fontawesome 5" libraries  for faster design, no SEO objectives no templating needs.
 
Structured in six section:

- "Actus" : a blog like section.
- "Calendrier" : display the next event in head, then all futur events if exists.
- "Resltats" : display the last result first, then all results by decreasing dates
- "Bio" : Simple text section with fontawesome header
- "Parrainage" & "sponsors" : fotos display sections

### Database with Google Sheets API

"Actus", "Calendrier" and "résulats" sections are update form a "Google Sheet" compose by a sheets by section.
They are dynamically import with "jQuery" from "Google API" with some page's trigger.

### Publication

Clone folder

```sh
$ git clone https://github.com/jn-prod/GaelLeBellec.git GaelLeBellec
$ cd GaelLeBellec
```

Deploy changes

```sh
$ git add .
$ git commit -m "make it better"
$ git push origin branch
```

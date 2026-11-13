# Sketches de sections — landing ReachDem

Ces GIF sont des **sketches vierges** : la structure de chaque section, pas son design.
Ils servent de plan de travail — on les remplace un par un par la vraie section.

## Règle

Un sketch = une section = un GIF. Tant qu'une section n'est pas construite, son
GIF est la référence de ce qu'elle doit contenir. Quand la section est
développée, on la regarde à côté du GIF et on valide que rien ne manque.

Les sketches n'inventent aucun contenu : pas de copie, pas de chiffres, pas de
couleur de marque. Seulement des zones nommées et leurs proportions.

## Ordre des sections (page d'accueil)

```
01  navbar            barre fixe — logo, navigation, un seul CTA
02  hero              une seule promesse — visuel produit a droite
03  logos             preuves — qui nous fait deja confiance
04  probleme          le constat — trois douleurs
05  features          ce que le produit fait — grille de six
06  process           comment ca marche — trois etapes
07  demo              produit en action — capture reelle
08  testimonial       une voix forte, pas un mur de citations
09  chiffres          preuves chiffrees, verifiables
10  academy           teaser formation + suivi
11  blog              teaser trois articles
12  pricing-teaser    trois plans, un mis en avant
13  faq               les vraies objections
14  cta               derniere action avant le footer
15  footer            navigation secondaire + preuves + mentions
```

## Regenerer

```bash
python design/sketches/make_sketches.py          # tout
python design/sketches/make_sketches.py hero faq # seulement certains
```

Sortie : `design/sketches/out/*.gif` (1200×820, boucle infinie).

Pour changer le contenu d'une section, on édite son entrée dans `SECTIONS`
(`make_sketches.py`) : chaque zone est `(libelle, (x, y, w, h), type)` avec des
fractions de la zone de contenu, et un type optionnel : `block` (defaut),
`text` (lignes de texte simulees) ou `cta` (bouton accentue).

# Audit de la landing reachdem.cc — octobre 2026

Audit du code de `reachdem.cc` (commit `daf1153`) croisé avec le produit réel
(`ReachDem/reachdem`, v1.3.1.1). Audit fait par lecture du code ; le rendu visuel n'a pas
été vérifié dans un navigateur.

## 1. Promesses fausses ou non vérifiables (à corriger en premier)

| Où | Promesse | Réalité |
| --- | --- | --- |
| `lib/pricing-data.ts`, Growth | « Reusable message templates », « Automation flows for status updates and follow-ups » | Ni templates ni automatisations en base. |
| `lib/pricing-data.ts`, Pro | « Advanced roles and approval workflows », « Webhooks » | Approbations : roadmap phase 05 (planifiée). Webhooks sortants : aucun modèle en base. |
| `FeaturesSection.tsx`, Contacts | « Import from CSV or sync with your tools » | Import CSV seulement. |
| `FeaturesSection.tsx`, Email | « templates, personalization » | Templates non livrés. |
| `components/FAQSection.tsx` | « Pricing is generally based on your usage… » | Faux : plans fixes (5 000 / 15 000 / 50 000 XAF) + crédits. Les réponses de la FAQ sont génériques et prudentes : elles ne citent aucun chiffre, ni canal, ni pays. |
| `LogosSection.tsx` | « Supported from the start by the best partners » + logo MTN | À confirmer : utiliser le logo MTN suppose un accord de marque. ElevenLabs correspond à un programme de grants, à formuler comme tel. |
| JSON-LD `SoftwareApplication` | `priceCurrency: "USD"` | Les prix sont en XAF. |

Les listes de fonctions des plans sont copiées de
`packages/core/src/services/billing-catalog.service.ts` : il faut aussi corriger la source
dans le monorepo, sinon l'app affiche les mêmes promesses au moment du paiement.

## 2. Liens cassés et contenu périmé

- Tous les CTA de `/pricing` pointent vers `/signup`, une route qui n'existe pas sur la
  landing (404). Le reste du site utilise `https://app.reachdem.cc/register`.
- Footer : Twitter → `https://twitter.com`, Facebook → `https://facebook.com/` (pages
  d'accueil génériques, pas les comptes ReachDem).
- `/links` présente Links comme « Coming soon » avec une liste d'attente, alors que Links
  est en production (versions 1.0.1 à 1.3.0 du monorepo).
- `/links` renvoie vers `cards-by-reachdem.vercel.app`, alors que le header renvoie vers
  `cards.reachdem.cc/order` : deux URL pour le même produit.
- `lib/roadmap-data.ts` est en retard sur le produit : la phase 02 (Q2 2026) est encore
  « in progress », la phase 04 (Links ↔ Cards) est « planned » alors que le choix de
  destination de la carte est sorti en 1.3.0, et la phase 06 met les APIs en 2027+ alors
  que l'API publique v1 existe déjà.
- `components/changelog6.tsx` (dates 2025) et `components/feature322.tsx`,
  `components/landing/feature274.tsx` ne sont importés nulle part : code mort de template.

## 3. Le produit est mal vendu

- WhatsApp est livré (sessions QR, médias, campagnes) mais n'apparaît sur la homepage que
  dans la FAQ et les métadonnées. Pas de carte dans la section fonctions, et la pricing dit
  seulement « WhatsApp-ready ».
- L'inbox n'est mentionnée nulle part.
- Les différenciateurs réels n'apparaissent pas : fallback SMS multi-fournisseurs, envois
  idempotents, file d'attente asynchrone, paiement mobile money local (CM, CI, SN, NG, UG),
  désinscription en un clic et gestion du consentement.
- La section « API and automation » renvoie vers `/docs/getting-started`, un guide
  utilisateur sans contenu API. L'API v1 (clés API, `Idempotency-Key`, messages / contacts /
  campagnes) n'a ni page, ni exemple de code, ni lien vers la référence de l'app.
- Les volumes inclus (150 / 500 / 2 000 SMS…) et l'offre gratuite (5 SMS d'essai)
  n'apparaissent pas sur `/pricing`. Le « Start free » de la homepage ne dit pas ce que
  contient le gratuit.
- Aucune preuve : ni chiffre d'usage, ni témoignage, ni client nommé, ni démo animée du
  produit (une seule capture, `/images/screens/insights.png`).

## 4. Structure et copie de la homepage

- Le même message est répété quatre fois (cartes « For SMEs… », section fonctions, grille
  « Why ReachDem », CTA) sans progression : problème → mécanisme → preuve → offre.
- Le titre du hero, « Reach customers faster / everywhere / with proof », est générique.
  Il ne dit ni le canal, ni la cible, ni le marché.
- Les cartes de fonctions ne révèlent leur texte qu'au survol (`onMouseEnter`) : sur mobile
  et au clavier, on ne voit que le titre. Elles chargent aussi three.js
  (`@react-three/fiber`) pour un effet décoratif, ce qui alourdit le JS de la homepage.
- Assets chargés depuis des CDN tiers : motif du hero
  (`deifkwefumgah.cloudfront.net/shadcnblocks/...`) et logo ElevenLabs. Si l'hôte change,
  ils disparaissent sans prévenir.
- Le sélecteur de police (`FontSwitcher`) est livré en production dans le footer : c'est un
  outil de dev.
- La classe `text-primary text-muted-foreground` se contredit sur le sous-titre des logos.
- `public/images/Orange.png` n'est pas utilisée.

## 5. SEO et internationalisation

- Le schéma `FAQPage` en JSON-LD sur la homepage décrit des questions qui ne sont pas
  affichées sur cette page. Les règles de Google sur les données structurées exigent que le
  contenu soit visible, au risque de les voir ignorées.
- La `SearchAction` cible `/faq?q=...`, mais la FAQ ne lit aucun paramètre `q`.
- hreflang : `en`, `fr-CM` et `fr-FR` pointent tous vers `/`, alors que le site n'existe
  qu'en anglais. C'est une déclaration incorrecte, et `alternateLocale` fr en Open Graph
  pose le même problème.
- Le cœur de cible est francophone, la landing est 100 % anglaise, et l'app, Links et
  Cards sont déjà bilingues. C'est le plus gros écart stratégique.
- `keywords` meta : ignoré par Google, sans effet.

## 6. Opérations

- `app/api/support/route.ts` envoie les demandes à des adresses Gmail personnelles codées
  en dur. Il faudrait une adresse support@ en variable d'environnement.

## Ordre de correction proposé

1. Retirer ou marquer « bientôt » les fonctions non livrées (pricing landing + catalogue du
   monorepo), corriger la FAQ tarifaire et `priceCurrency`.
2. Corriger les liens cassés (`/signup`, réseaux sociaux, URL Cards) et la page `/links`.
3. Mettre la roadmap et le changelog à jour à partir du `CHANGELOG.md` du monorepo.
4. Ajouter WhatsApp, l'inbox, la fiabilité d'envoi et le mobile money à la homepage ;
   afficher les volumes inclus sur `/pricing`.
5. Version française (i18n) et hreflang correct.
6. Nettoyage : code mort, `FontSwitcher`, assets hot-linkés, cartes au survol remplacées
   par des cartes lisibles sur mobile.

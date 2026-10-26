# reachdem.cc — landing publique de ReachDem

Site marketing (Next.js 16, React 19, Tailwind 4, pnpm). Le produit vit dans le repo
`ReachDem/reachdem` (monorepo). Ce fichier fixe ce qui est vrai sur ReachDem, pour que la
landing ne promette rien que le produit ne fait pas. Audit détaillé :
`docs/landing-audit-2026-10.md`.

Vérifier avant d'écrire : `pnpm lint` puis `pnpm build`.

## Règle de copie

Chaque promesse de la landing doit correspondre à du code livré dans `ReachDem/reachdem`
(ou être marquée « bientôt » / renvoyer à la roadmap). En cas de doute, vérifier dans
`packages/database/prisma/schema.prisma`, `packages/core/src/services/` et `CHANGELOG.md`
du monorepo. Ne jamais inventer de chiffres, de clients ou de partenariats.

## Ce qu'est ReachDem (état vérifié au 2026-10-26, monorepo v1.3.1.1)

Plateforme B2B2C de communication client pour PME, d'abord en Afrique francophone
(Cameroun en tête), utilisable ailleurs. Ambition du PRD : un « Marketing Operating
System » simple, fiable et mesurable. Contributeurs cités dans les docs : latioms, Ronald,
Belrick, Merveilles ; suivi dans Linear (préfixe `REA2-`).

### Écosystème (apps du monorepo)

| Produit | URL | État |
| --- | --- | --- |
| App principale (`apps/web`) | app.reachdem.cc (`/register`, `/login`) | En production |
| ReachDem Links (`apps/links`) | profils de liens, liens courts | En production (FR/EN) |
| Cards by ReachDem (`apps/cards`) | cards.reachdem.cc | En production : cartes NFC, 3 finitions (Glossy Black, Matte Black, Glossy White), paiement Flutterwave mobile money, codes promo, FR/EN |
| Forms by ReachDem (`apps/forms`) | — | En construction. Positionnement : « Google Forms collects answers. ReachDem Forms turns answers into customers. » |
| Radar (`apps/radar`) | radar.reachdem.cc | Matching fondateurs ↔ programmes startup (règles déterministes + Gemini) |
| Founder dashboard (`apps/dashboard`) | interne | Admin, coupons, finance |
| Workers (`apps/workers`) | Cloudflare Workers + Queues | Envoi asynchrone email / SMS / WhatsApp / campagnes / scheduler, DLQ |

Raccourcisseur de liens : domaine `rcdm.ink` (Sink auto-hébergé).

### Fonctions livrées dans l'app principale

- Onboarding guidé en 4 étapes, workspaces (organisations), membres, invitations.
- Contacts : champs standards + 5 champs personnalisés, import CSV avec mapping visuel,
  doublons, erreurs ligne par ligne.
- Groupes (listes statiques) et segments dynamiques (query builder, aperçu en temps réel).
- Campagnes SMS, email, WhatsApp : brouillon, révisions, audience (groupes + segments),
  lancement, planification, détail de campagne, liens trackés par contact.
- SMS multi-fournisseurs avec fallback automatique, envois idempotents, journal des appels
  fournisseurs.
- Email via Alibaba Direct Mail, en-têtes de désinscription, suppressions, preuves de
  consentement, désinscription en un clic.
- WhatsApp via Evolution API : session par QR, médias, envoi de campagnes.
- Inbox (`/inbox`).
- API publique v1 : clés API (`Authorization: Bearer`), `Idempotency-Key` sur toutes les
  écritures, ressources messages / contacts / groups / segments / campaigns / stats /
  billing. Référence dans l'app (`/api-reference`).
- Facturation : plans mensuels + crédits prépayés, paiement mobile money (CM XAF, CI/SN
  XOF, NG NGN, UG UGX).

### Pas livré (ne pas vendre comme disponible)

- Templates de messages réutilisables (aucun modèle en base).
- Automatisations / flows de relance (aucun modèle en base).
- Rôles avancés et workflows d'approbation (roadmap phase 05).
- Webhooks sortants clients : prévus dans le contrat API v1, pas de modèle en base
  (seuls les webhooks de paiement entrants existent).
- Intégrations CRM / formulaires / e-commerce, IA d'aide à la rédaction (roadmap 2027+).
- « Sync avec vos outils » pour les contacts.

### Tarifs réels (`packages/core/src/services/billing-catalog.service.ts` + `plan-entitlements.service.ts`)

| Plan | Prix / mois | SMS inclus | Emails inclus |
| --- | --- | --- | --- |
| Free | 0 | 5 SMS d'essai | — |
| Basic | 5 000 XAF | 150 | 250 |
| Growth (mis en avant) | 15 000 XAF | 500 | 1 000 |
| Pro | 50 000 XAF | 2 000 | 4 000 |
| Custom Enterprise | sur devis | — | — |

Crédits : achat minimum 250, email à 5 XAF l'unité, SMS par paliers. Les prix sont
surchargeables par variables d'environnement : en cas de doute, demander la grille en
vigueur. Attention : les listes de fonctions des plans dans le catalogue (et donc dans
`lib/pricing-data.ts`) reprennent des fonctions non livrées (voir ci-dessus).

### Cibles et messages

- Cibles de la landing : PME, restaurants, logistique, équipes tech (une page
  `/use-cases/*` par cible). Personas du PRD : responsable marketing PME, ops / service
  client, dev/CTO de PME, indépendant (Links + carte), admin/finance.
- Proposition de valeur : un seul outil pour contacts + SMS/email/WhatsApp + liens trackés,
  pour savoir qui a reçu, qui a cliqué, et qui relancer. Fiabilité d'envoi (fallback,
  idempotence, file d'attente) et paiement local en mobile money.
- Marché d'abord francophone : la landing est aujourd'hui uniquement en anglais.

### Design system

- Accent orange `#ff8a3d → #ffc89a` et vert très clair `#dff0d8 → #f3faef`, dégradés
  linéaires à 135°, une seule teinte à la fois, jamais les deux mélangées.
- Polices : Syne (titres, `font-display`), Geist, Neue Montreal (fichiers locaux).

# ReachDem — Changelog · Étape 2
**Le Cœur du Produit : Campagnes, Messaging Asynchrone & Liens Trackés**
*Période : 9 → 14 mars 2026*

---

> **Ce que cette étape change pour vous :** ReachDem devient une plateforme d'envoi complète. Créez une campagne, ciblez votre audience, envoyez à grande échelle — et mesurez chaque clic.

---

## ✦ Campaigns API — L'orchestration au cœur du produit ✅ Livré

La brique centrale de ReachDem est là. Une campagne, c'est simple : un canal, un contenu, une audience, un bouton "Lancer". Sous le capot, ReachDem gère tout — il résout l'audience (groupes + segments), crée un message par contact, et déclenche l'envoi. L'API est robuste, extensible, et prête pour le scheduling futur.

---

## ✦ Messaging Asynchrone — Cloudflare Workers 🔍 En Review

L'envoi de messages ne bloque plus rien. L'API crée le message et le place en queue — le worker Cloudflare le consomme et l'envoie au provider de manière **totalement asynchrone**. Résultat : votre interface reste fluide même lors d'envois massifs, et les pics de charge ou les indisponibilités temporaires d'un provider n'impactent plus vos campagnes. C'est l'architecture qui permet de passer à l'échelle sereinement.

---

## ✦ Liens Trackés — Chaque clic compte (via rcdm.ink) 🔄 En cours

Chaque lien dans vos SMS devient un lien court tracké sous votre domaine (`rcdm.ink`), alimenté par **Sink** en self-hosted. ReachDem génère le lien, l'associe à votre campagne, votre message et votre contact — et remonte les statistiques de clics en temps réel. Vous savez qui a cliqué, sur quoi, et quand. Le suivi d'engagement commence ici.

---

## ✦ Interface Campagnes — Création, édition & lancement 🔄 En cours

L'interface complète de gestion des campagnes arrive dans le dashboard. De la création à l'envoi, tout se fait depuis un seul endroit : définir le canal, rédiger le contenu, attacher une audience (groupes et/ou segments), sauvegarder en brouillon, et lancer en un clic. Conçue pour être rapide, pas fastidieuse.

---

## ✦ Détail Campagne — Suivi & Monitoring 📋 À venir

Un écran de suivi dédié par campagne : état global de l'envoi en temps réel, statistiques de livraison et de clics, liste complète des cibles avec le statut de chaque message. Vous avez une visibilité totale sur ce qui se passe après avoir appuyé sur "Envoyer".

---

## ✦ Stats API — Métriques agrégées avec cache Redis 📋 À venir

Les statistiques de campagne seront calculées et exposées via une API dédiée, s'appuyant sur les données de livraison et les clics remontés par la couche Links. Un cache Redis assure des temps de réponse rapides même pour les campagnes à fort volume. Des chiffres précis, sans attendre.

---

## ✦ Interface Links — Analytics de vos liens trackés 📋 À venir

Un module dédié aux liens : listing de tous les liens trackés créés, rattachement visible à la campagne ou au message d'origine, statistiques de clics, et écran détail par lien. Simple, propre, actionnable.

---

**En résumé :** Cette étape fait de ReachDem une plateforme d'envoi à part entière. Vous pouvez créer une campagne ciblée, l'envoyer à grande échelle de manière fiable et asynchrone, tracker les clics sur vos liens, et consulter les performances depuis le dashboard — le tout dans un produit cohérent et pensé pour vos clients.

---
*ReachDem MVP — Cycle 2*

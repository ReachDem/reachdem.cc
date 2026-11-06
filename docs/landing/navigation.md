# Landing ReachDem : navigation et offre

> Décidé le 2026-11-06. Document de travail pour la refonte de la landing. Rien n'est encore implémenté.

## Principes

- **La home convertit tout le monde. Chaque page Solution convertit une cible précise**, avec la même anatomie que la home mais un contenu propre.
- **On montre l'offre telle qu'elle sera au lancement.** La landing n'est pas publiée tant que les éléments du menu n'existent pas (voir les prérequis de publication).
- **On ne vend que l'email pour l'instant.** SMS et WhatsApp ne sont pas assez stables. Ils reviendront quand ils le seront.
- **Les cas d'usage décrivent une tâche que le client doit faire de toute façon**, pas une fonctionnalité. C'est le modèle de sent.dm (Order Notifications, Authentication, Marketing Campaigns).

## Barre de navigation

```
ReachDem   Produit ▾   Solutions ▾   Développeurs ▾   Prix        [Parler à l'équipe]  [Commencer]
```

- **Prix** est un lien direct vers `/pricing`, sans menu.
- **Parler à l'équipe** : bouton en contour, mène vers `/sales`.
- **Commencer** : le seul bouton plein, mène vers l'inscription.

### Produit

| Distribuer & prospecter | Communiquer | Mesurer |
|---|---|---|
| **Cards** : Partagez tout votre monde d'un simple geste | **Email marketing** : Campagnes, newsletters et séquences | **Influence reporting** : Prouvez ce que les créateurs ont diffusé |
| **Links** : Votre profil pro, prêt à être partagé | **Workflows automatisés** : Un déclencheur, une action, sans y penser *(Bientôt)* | **IA : analytics et recommandations** : Comprenez vos résultats, sachez quoi faire |
| **Forms** : Des formulaires qui convertissent *(Nouveau)* | | |

- **Cards et Links sont deux produits distincts.** Cards passe en premier : c'est lui qui prospecte.
- **Forms** est en production depuis le 2026-11-04, d'où le badge « Nouveau ».
- La ligne de Forms, courte, sert de modèle pour raccourcir les autres plus tard.

### Solutions

| Par métier | Par secteur | Par cas d'usage |
|---|---|---|
| **Marketing operators** : Pilotez et prouvez chaque campagne | **E-commerce** : De la première visite à la commande suivante | **Séquences de conversion** : Du prospect au client, étape par étape |
| **Sales et business developers** : Transformez chaque rencontre en pipeline | **Logistique** : Prévenez chaque destinataire, à chaque étape | **Notifications de commande** : Confirmation, expédition, livraison |
| **Builders** : Ajoutez l'email à votre produit | | **Création assistée par IA** : Rédigez vos campagnes avec l'IA |
| | | **Prospection terrain** : Une carte tendue, un contact mesuré |
| | | **Preuve de diffusion** : Ce qu'un créateur a dit, vidéo par vidéo |

- **Les cibles prioritaires sont les Digital builders** : marketing operators, sales et business developers, builders.
- **Les développeurs sont couverts par « Builders »** côté Solutions, et par le menu Développeurs côté intégration.
- **Sans SMS, la logistique est faible au lancement** : prévenir le jour de la livraison passe surtout par SMS. Les notifications de commande valent surtout pour l'e-commerce, en email.
- Les pages Solutions vivent sous `/solutions/<slug>`.

### Développeurs

| Construire | Suivre |
|---|---|
| **Démarrage rapide** : Envoyez votre premier email par API | **Changelog** : Ce qui est sorti récemment |
| **Référence API** : Chaque endpoint et chaque champ | **Statut de l'API** : Disponibilité en direct |
| **SDK** : Node, Python et d'autres | **Roadmap** : Ce qui arrive ensuite |
| **Webhooks** : Statuts de livraison signés | **Support** : Une vraie personne qui répond |
| **Serveur MCP** : Pilotez ReachDem depuis vos agents | |

Encart à droite : **Obtenir une clé API**, « Premier envoi en quelques minutes », bouton « Créer un compte ».

## Prérequis de publication

La landing ne sort pas tant que ces éléments n'existent pas :

- SDK (langages à choisir) ;
- serveur MCP ;
- page de statut de l'API ;
- workflows automatisés (affichés « Bientôt » d'ici là) ;
- IA : analytics et recommandations ;
- destination propre aux cartes, pour que Cards soit vraiment un produit de prospection.

## Cards, produit de prospection

Le fait qu'une carte puisse renvoyer vers une autre page qu'un profil Links est voulu : Cards doit devenir une machine à prospection.

- **Cards reste sur le moteur Links** : créer un compte Cards crée un compte Links. On ne construit pas de gestion utilisateur propre à Cards.
- **La page Cards du dashboard Links devient le vrai produit** : destination, scans, contacts obtenus.
- **La destination devient un réglage de la carte** (profil par défaut, Form, URL, WhatsApp), indépendant des liens du profil, avec ses propres statistiques.
- **Plus tard**, les contacts captés rejoignent les contacts ReachDem pour être relancés par séquences et workflows.

Chantier Linear : REA2-286 (projet ReachDem Cards), sous-tâches REA2-287 à REA2-291.

## Micro-animations (inspiration sent.dm)

- **Texte qui roule sur les boutons** : chaque lettre est un petit cube avec deux faces identiques, qui pivote de 90° au survol, avec un léger décalage d'une lettre à l'autre. Le retour est instantané. Désactivé si l'utilisateur préfère réduire les animations, avec un libellé caché pour les lecteurs d'écran.
- **Menu déroulant qui se transforme** : un seul panneau givré qui change de position, de largeur et de hauteur d'un menu à l'autre. Le contenu glisse légèrement dans le sens du déplacement, le chevron pivote de 180°, le déclencheur actif reçoit une bordure.
- **Reproduction prévue** : un composant CSS pour le texte, et le `NavigationMenu` de Radix (shadcn) pour le panneau. C'est accessible et n'ajoute aucune dépendance, puisque Radix est déjà installé.

## Gabarit d'une page cas d'usage (inspiration sent.dm)

1. Un titre qui annonce le résultat.
2. Une tension posée en une phrase.
3. Trois douleurs concrètes, tirées du métier du client.
4. Comment ReachDem passe de l'événement au message.
5. Quatre capacités, formulées avec un verbe d'action.
6. Le contrôle : rester aligné avec la réalité du système.
7. La fiabilité comme argument de confiance.
8. Une FAQ d'objections.

## Points ouverts

- Sens exact de « Création assistée par IA ».
- Langages des SDK.
- Langue principale du site et des URL.
- Sort des pages actuelles `/use-cases/*` (redirections vers les nouvelles Solutions).
- Destinataire des demandes du formulaire `/sales` : une adresse dédiée plutôt que des adresses personnelles.

# ReachDem.cc

Site web officiel de ReachDem - Une plateforme moderne construite avec Next.js.

## 📋 À propos du projet

ReachDem.cc est l'application web principale de ReachDem, développée avec les dernières technologies web modernes. Ce projet utilise Next.js 16 avec React 19, TypeScript et Tailwind CSS 4 pour offrir une expérience utilisateur performante et réactive.

### Technologies utilisées

- **Framework**: [Next.js 16.1.1](https://nextjs.org) - Framework React pour les applications web
- **UI Library**: [React 19.2.3](https://react.dev) - Bibliothèque JavaScript pour les interfaces utilisateur
- **Langage**: [TypeScript 5](https://www.typescriptlang.org) - JavaScript avec typage statique
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com) - Framework CSS utility-first
- **Gestionnaire de paquets**: [pnpm](https://pnpm.io) - Gestionnaire de paquets rapide et efficace
- **Linting**: [ESLint 9](https://eslint.org) - Outil de linting pour JavaScript/TypeScript

## 🚀 Prérequis

Avant de commencer, assurez-vous d'avoir installé les éléments suivants sur votre machine :

- **Node.js** version 20 ou supérieure ([Télécharger Node.js](https://nodejs.org/))
- **pnpm** version 8 ou supérieure (recommandé)

### Installation de pnpm

Si vous n'avez pas encore pnpm installé, vous pouvez l'installer globalement avec npm :

```bash
npm install -g pnpm
```

Ou en utilisant d'autres méthodes selon votre système d'exploitation :
- **macOS/Linux**: `curl -fsSL https://get.pnpm.io/install.sh | sh -`
- **Windows**: `iwr https://get.pnpm.io/install.ps1 -useb | iex`

## 📦 Installation

Suivez ces étapes pour installer et configurer le projet localement :

### 1. Cloner le repository

```bash
git clone https://github.com/ReachDem/reachdem.cc.git
cd reachdem.cc
```

### 2. Installer les dépendances

Utilisez pnpm pour installer toutes les dépendances du projet :

```bash
pnpm install
```

Cette commande va télécharger et installer tous les paquets nécessaires définis dans `package.json`.

### 3. Lancer le serveur de développement

Une fois les dépendances installées, démarrez le serveur de développement :

```bash
pnpm dev
```

Le serveur de développement démarrera sur [http://localhost:3000](http://localhost:3000). Ouvrez cette URL dans votre navigateur pour voir l'application.

🎉 **Félicitations !** Vous avez maintenant le projet qui tourne localement !

## 🛠️ Scripts disponibles

Le projet contient plusieurs scripts npm pour faciliter le développement :

- `pnpm dev` - Lance le serveur de développement (avec hot-reload)
- `pnpm build` - Compile l'application pour la production
- `pnpm start` - Démarre le serveur de production (nécessite d'avoir lancé `pnpm build` avant)
- `pnpm lint` - Vérifie le code avec ESLint pour détecter les erreurs

## 📁 Structure du projet

Voici un aperçu de la structure des fichiers principaux :

```
reachdem.cc/
├── app/                    # Dossier principal de l'application (App Router)
│   ├── page.tsx           # Page d'accueil
│   ├── layout.tsx         # Layout principal de l'application
│   ├── globals.css        # Styles CSS globaux
│   └── favicon.ico        # Icône du site
├── public/                # Fichiers statiques (images, SVG, etc.)
├── .gitignore            # Fichiers à ignorer par Git
├── eslint.config.mjs     # Configuration ESLint
├── next.config.ts        # Configuration Next.js
├── package.json          # Dépendances et scripts du projet
├── pnpm-lock.yaml        # Fichier de verrouillage des dépendances pnpm
├── pnpm-workspace.yaml   # Configuration du workspace pnpm
├── postcss.config.mjs    # Configuration PostCSS
├── tsconfig.json         # Configuration TypeScript
└── README.md             # Ce fichier !
```

## 💻 Guide de développement

### Modifier les pages

- Le fichier principal de la page d'accueil se trouve dans `app/page.tsx`
- Les modifications sont automatiquement rechargées dans le navigateur (hot-reload)
- Le layout global est défini dans `app/layout.tsx`

### Ajouter des styles

Ce projet utilise Tailwind CSS 4. Vous pouvez :
- Utiliser les classes utility de Tailwind directement dans vos composants
- Modifier les styles globaux dans `app/globals.css`

### Optimisation des polices

Le projet utilise [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) pour optimiser automatiquement et charger [Geist](https://vercel.com/font), une famille de polices moderne.

### Vérifier la qualité du code

Avant de committer vos changements, assurez-vous que votre code respecte les standards :

```bash
pnpm lint
```

## 🤝 Contribution

Pour contribuer au projet :

1. Créez une branche pour votre fonctionnalité : `git checkout -b feature/ma-fonctionnalite`
2. Committez vos changements : `git commit -m 'Ajout de ma fonctionnalité'`
3. Poussez vers la branche : `git push origin feature/ma-fonctionnalite`
4. Ouvrez une Pull Request

## 📚 Ressources utiles

Pour en savoir plus sur les technologies utilisées :

- [Documentation Next.js](https://nextjs.org/docs) - Guide complet de Next.js
- [Apprendre Next.js](https://nextjs.org/learn) - Tutorial interactif
- [Documentation React](https://react.dev) - Apprendre React
- [Documentation TypeScript](https://www.typescriptlang.org/docs/) - Guide TypeScript
- [Documentation Tailwind CSS](https://tailwindcss.com/docs) - Guide Tailwind CSS
- [Documentation pnpm](https://pnpm.io/fr/) - Guide pnpm (en français !)

## 📝 Licence

Ce projet est privé et appartient à ReachDem.

## 🆘 Besoin d'aide ?

Si vous rencontrez des problèmes lors de l'installation ou du développement :

1. Vérifiez que vous avez la bonne version de Node.js (v20+)
2. Supprimez `node_modules` et `pnpm-lock.yaml`, puis réinstallez : `pnpm install`
3. Consultez les [issues GitHub](https://github.com/ReachDem/reachdem.cc/issues) du projet
4. Contactez l'équipe de développement

---

Développé avec ❤️ par l'équipe ReachDem

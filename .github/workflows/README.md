# GitHub Workflows - Telegram Notifications

Ce répertoire contient les workflows GitHub Actions pour les notifications Telegram et la génération automatique de changelogs.

## 📋 Workflows disponibles

### 1. Telegram Push Notification (`telegram-push-notification.yml`)
**Déclencheur:** Push sur n'importe quelle branche

**Description:** Envoie une notification Telegram à chaque fois que du code est poussé sur le repository.

**Message inclut:**
- Nom du repository
- Nom de la branche
- Auteur du push (avec mention @)
- Message du commit
- Lien vers le commit

### 2. Telegram PR Notification (`telegram-pr-notification.yml`)
**Déclencheur:** Ouverture d'une PR, passage en "ready for review", ou ajout de reviewers

**Description:** Envoie une notification Telegram lors de l'ouverture d'une pull request ou quand des reviewers sont ajoutés.

**Message inclut:**
- Nom du repository
- Numéro et titre de la PR
- Auteur de la PR
- Branches source et destination
- Liste des reviewers assignés (avec mentions @)
- Lien vers la PR

### 3. Telegram Merge Notification (`telegram-merge-notification.yml`)
**Déclencheur:** Fusion d'une pull request

**Description:** Envoie une notification Telegram quand une pull request est fusionnée.

**Message inclut:**
- Nom du repository
- Numéro et titre de la PR
- Auteur de la PR
- Personne ayant effectué la fusion
- Branches source et destination
- Lien vers la PR

### 4. Changelog Generator (`changelog-generator.yml`)
**Déclencheur:** Fusion d'une PR sur les branches `dev` ou `main` uniquement

**Description:** Génère automatiquement un changelog et l'ajoute au repository.

**Fonctionnalités:**
- Crée un fichier de changelog par date et branche dans le dossier `CHANGELOG/`
- Met à jour le fichier principal `CHANGELOG.md` à la racine
- Inclut les informations de la PR (numéro, titre, auteur, lien)
- Liste tous les commits de la PR
- Commit et push automatiquement les modifications
- Envoie une notification Telegram

## 🔧 Configuration requise

### Secrets GitHub

Pour que ces workflows fonctionnent, vous devez configurer les secrets suivants dans votre repository GitHub :

1. **`TELEGRAM_BOT_TOKEN`**
   - Token de votre bot Telegram
   - Obtention : Créez un bot via [@BotFather](https://t.me/botfather) sur Telegram
   - Format : `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`

2. **`TELEGRAM_CHAT_ID`**
   - ID du chat/canal Telegram où envoyer les notifications
   - Obtention : 
     - Pour un canal : ID du canal (commence par `-100`)
     - Pour un chat privé : Votre ID utilisateur
     - Utilisez [@userinfobot](https://t.me/userinfobot) pour obtenir votre ID
   - Format : `-1001234567890` ou `123456789`

### Comment ajouter les secrets

1. Allez dans `Settings` > `Secrets and variables` > `Actions`
2. Cliquez sur `New repository secret`
3. Ajoutez `TELEGRAM_BOT_TOKEN` avec la valeur de votre token
4. Ajoutez `TELEGRAM_CHAT_ID` avec l'ID de votre chat/canal

### Permissions requises

Le workflow de génération de changelog nécessite les permissions suivantes :

- **Contents:** Write (pour créer et modifier les fichiers de changelog)
- **Pull requests:** Read (pour lire les informations des PRs)

Ces permissions sont généralement accordées par défaut au `GITHUB_TOKEN`.

## 🔍 Détails techniques

### Push Notification
- Se déclenche sur **toutes les branches** (`branches: ['**']`)
- Utilise `github.actor` pour mentionner l'auteur du push

### PR Notification
- Extrait automatiquement les reviewers (individuels et équipes)
- Formate les noms avec des mentions `@`
- Gère le cas où aucun reviewer n'est assigné

### Merge Notification
- Utilise une condition `if: github.event.pull_request.merged == true`
- Ne se déclenche que pour les PRs effectivement fusionnées (pas fermées sans fusion)

### Changelog Generator
- **Branches cibles:** `dev` et `main` uniquement
- **Structure des fichiers:**
  - `CHANGELOG/{branch}-{date}.md` : Changelogs journaliers par branche
  - `CHANGELOG.md` : Changelog principal consolidé
- **Format du changelog:**
  - Titre avec numéro et nom de la PR
  - Métadonnées (auteur, date, lien)
  - Liste de tous les commits de la PR
- **Commit automatique:**
  - Utilisateur : `github-actions[bot]`
  - Message : `chore: update changelog for PR #{number}`

## 📝 Exemple de notification Telegram

**Push:**
```
🔔 Push Notification

Repository: ReachDem/reachdem.cc
Branch: feature/new-feature
Pusher: @latioms
Commit: Add new feature implementation

[View Commit](https://github.com/...)
```

**Pull Request:**
```
📥 Pull Request opened

Repository: ReachDem/reachdem.cc
PR: #42 - Add authentication system
Author: @developer
Branch: feature/auth → dev
Reviewers: @reviewer1, @reviewer2

[View Pull Request](https://github.com/...)
```

**Merge:**
```
✅ Pull Request Merged

Repository: ReachDem/reachdem.cc
PR: #42 - Add authentication system
Author: @developer
Merged by: @maintainer
Branch: feature/auth → dev

[View Pull Request](https://github.com/...)
```

**Changelog:**
```
📝 Changelog Updated

Repository: ReachDem/reachdem.cc
Branch: dev
PR: #42 - Add authentication system

A new changelog entry has been created.

[View Repository](https://github.com/...)
```

## 🐛 Dépannage

### Les notifications ne sont pas envoyées
1. Vérifiez que les secrets `TELEGRAM_BOT_TOKEN` et `TELEGRAM_CHAT_ID` sont correctement configurés
2. Assurez-vous que le bot Telegram a été ajouté au canal/chat
3. Vérifiez que le bot a les permissions d'envoyer des messages
4. Consultez les logs des workflows dans l'onglet "Actions" de GitHub

### Le changelog n'est pas généré
1. Vérifiez que la PR cible bien `dev` ou `main`
2. Assurez-vous que les permissions du `GITHUB_TOKEN` sont suffisantes
3. Vérifiez les logs du workflow pour voir les erreurs éventuelles

### Les mentions @ ne fonctionnent pas
Les mentions Telegram fonctionnent si :
- L'utilisateur a un username Telegram
- Le format est `@username` (sans espace)
- L'utilisateur est membre du canal/chat

## 📚 Ressources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Telegram Bot API](https://core.telegram.org/bots/api)
- [appleboy/telegram-action](https://github.com/appleboy/telegram-action)
- [GitHub Webhooks Documentation](https://docs.github.com/en/webhooks)

---

Développé pour ReachDem avec ❤️

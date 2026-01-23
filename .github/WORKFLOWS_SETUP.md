# Configuration des Workflows GitHub

## Secrets requis

Pour que les workflows fonctionnent, vous devez configurer les secrets suivants dans votre repository GitHub :

### 1. Créer un bot Telegram

1. Ouvrez Telegram et cherchez [@BotFather](https://t.me/botfather)
2. Envoyez `/newbot` et suivez les instructions
3. Choisissez un nom et un username pour votre bot
4. BotFather vous donnera un **token** - gardez-le en sécurité

### 2. Obtenir l'ID du chat/canal Telegram

#### Pour un canal public ou privé :
1. Ajoutez votre bot au canal comme administrateur
2. Envoyez un message dans le canal
3. Visitez : `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
4. Cherchez `"chat":{"id":-1001234567890` dans la réponse
5. L'ID sera un nombre négatif commençant par `-100`

#### Pour un chat privé :
1. Envoyez un message à votre bot sur Telegram
2. Visitez : `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
3. Cherchez votre `"id"` dans la réponse

### 3. Configurer les secrets dans GitHub

1. Allez dans votre repository sur GitHub
2. Cliquez sur `Settings` → `Secrets and variables` → `Actions`
3. Cliquez sur `New repository secret`
4. Ajoutez les secrets suivants :

   **TELEGRAM_BOT_TOKEN**
   - Nom : `TELEGRAM_BOT_TOKEN`
   - Valeur : Le token que BotFather vous a donné
   - Exemple : `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`

   **TELEGRAM_CHAT_ID**
   - Nom : `TELEGRAM_CHAT_ID`
   - Valeur : L'ID du chat ou canal
   - Exemple : `-1001234567890` (canal) ou `123456789` (chat privé)

## Workflows créés

### 1. `telegram-push-notification.yml`
- **Déclencheur** : Push sur n'importe quelle branche
- **Action** : Envoie une notification à chaque push
- **Message** : Inclut le pusher (avec @), la branche, et le message du commit

### 2. `telegram-pr-notification.yml`
- **Déclencheur** : Création de PR, passage en "ready for review", ou ajout de reviewers
- **Action** : Envoie une notification avec les reviewers mentionnés
- **Message** : Inclut les reviewers (avec @), l'auteur, et les branches

### 3. `telegram-merge-notification.yml`
- **Déclencheur** : Fusion d'une PR
- **Action** : Envoie une notification de fusion
- **Message** : Inclut l'auteur, la personne ayant fusionné, et les branches

### 4. `changelog-generator.yml`
- **Déclencheur** : Fusion de PR sur `dev` ou `main` uniquement
- **Action** : Génère un changelog et commit automatiquement
- **Sortie** : Crée/met à jour `CHANGELOG.md` et `CHANGELOG/{branch}-{date}.md`

## Test des workflows

### Tester la notification de push :
```bash
git checkout -b test-workflows
echo "test" > test.txt
git add test.txt
git commit -m "test: verify push notification"
git push origin test-workflows
```

### Tester la notification de PR :
1. Créez une PR depuis votre branche de test
2. Ajoutez des reviewers
3. Vérifiez que vous recevez une notification Telegram

### Tester la notification de merge :
1. Fusionnez la PR de test
2. Vérifiez que vous recevez une notification de fusion

### Tester le générateur de changelog :
1. Créez une PR vers `dev` ou `main`
2. Fusionnez-la
3. Vérifiez que le changelog est créé et committé

## Dépannage

### Les notifications ne sont pas envoyées
- Vérifiez que les secrets sont correctement configurés
- Assurez-vous que le bot est membre du canal/chat
- Vérifiez que le bot a les permissions d'envoyer des messages
- Consultez les logs dans l'onglet "Actions" de GitHub

### Le changelog n'est pas généré
- Vérifiez que la PR cible `dev` ou `main`
- Assurez-vous que la PR est bien fusionnée (pas juste fermée)
- Vérifiez les permissions du `GITHUB_TOKEN`
- Consultez les logs du workflow

### Les mentions @ ne fonctionnent pas
- Les utilisateurs doivent avoir un username Telegram
- Les utilisateurs doivent être membres du canal/chat
- Le format doit être `@username` (GitHub login)

## Prochaines étapes

1. ✅ Configurer les secrets `TELEGRAM_BOT_TOKEN` et `TELEGRAM_CHAT_ID`
2. ✅ Ajouter le bot au canal Telegram de ReachDem
3. ✅ Tester chaque workflow
4. ✅ Ajuster les messages si nécessaire

## Support

Pour toute question ou problème, consultez :
- [Documentation GitHub Actions](https://docs.github.com/en/actions)
- [Telegram Bot API](https://core.telegram.org/bots/api)
- [appleboy/telegram-action](https://github.com/appleboy/telegram-action)

# GitHub Workflows Documentation

This repository includes GitHub Actions workflows for automated Telegram notifications and changelog generation.

## Required GitHub Secrets

To use the Telegram notification workflows, you need to configure the following secrets in your GitHub repository settings:

### Setting up Telegram Bot

1. **Create a Telegram Bot**:
   - Open Telegram and search for `@BotFather`
   - Send `/newbot` command
   - Follow the instructions to create your bot
   - Save the **bot token** provided by BotFather

2. **Get Your Chat ID**:
   - Add your bot to your Telegram group/channel (ReachDem channel)
   - Send a message in the channel
   - Visit: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
   - Find the `chat` object in the response and copy the `id` value

3. **Configure GitHub Secrets**:
   - Go to your repository on GitHub
   - Navigate to **Settings** → **Secrets and variables** → **Actions**
   - Click **New repository secret**
   - Add the following secrets:

   | Secret Name | Description | Example |
   |------------|-------------|---------|
   | `TELEGRAM_BOT_TOKEN` | The token provided by BotFather | `123456789:ABCdefGHIjklMNOpqrsTUVwxyz` |
   | `TELEGRAM_CHAT_ID` | The chat ID of your Telegram group/channel | `-1001234567890` |

## Workflows Overview

### 1. Push Notification (`telegram-push-notification.yml`)
- **Trigger**: On every push to any branch
- **Action**: Sends a notification to Telegram with:
  - Repository name
  - Branch name
  - Pusher username (mentions @username)
  - Commit message
  - Files changed (added, modified, removed)
  - Link to commit

### 2. Pull Request Notification (`telegram-pr-notification.yml`)
- **Trigger**: When a PR is opened, reopened, or reviewers are requested
- **Action**: Sends a notification to Telegram with:
  - Repository name
  - PR number and title
  - Author username
  - Source and target branches
  - List of requested reviewers (mentions @reviewers)
  - PR description
  - Link to PR

### 3. Merge Notification (`telegram-merge-notification.yml`)
- **Trigger**: When a PR is merged (closed with merged status)
- **Action**: Sends a notification to Telegram with:
  - Repository name
  - PR number and title
  - Merger and author usernames
  - Source and target branches
  - Statistics (commits, files changed, additions, deletions)
  - Link to merged PR

### 4. Changelog Generation (`changelog.yml`)
- **Trigger**: On push to `dev` or `main` branches
- **Action**: 
  - Generates a changelog from merged PRs and commits
  - Creates/updates `CHANGELOG.md` in the repository
  - Creates individual changelog files in `changelogs/` directory
  - Commits the changes back to the repository
  - Sends a notification to Telegram

## Changelog Format

The changelog categorizes changes based on PR labels:
- 🚀 **Features**: `feature`, `enhancement`
- 🐛 **Fixes**: `fix`, `bug`
- 🧪 **Tests**: `test`
- 📚 **Documentation**: `documentation`, `docs`
- 🔧 **Maintenance**: `chore`, `dependencies`

## Testing the Workflows

After setting up the secrets, you can test the workflows by:

1. **Push Notification**: Push a commit to any branch
2. **PR Notification**: Create a new pull request and request reviewers
3. **Merge Notification**: Merge a pull request
4. **Changelog**: Push to `dev` or `main` branch

## Troubleshooting

- **No notifications received**: 
  - Verify the bot token and chat ID are correct
  - Ensure the bot has been added to the Telegram group/channel
  - Check the workflow logs in GitHub Actions
  
- **Changelog not generated**: 
  - Ensure you're pushing to `dev` or `main` branch
  - Check that the workflow has write permissions
  - Review the workflow logs for errors

## Notes

- All notifications use Markdown formatting for better readability
- The changelog workflow skips CI on its commits to avoid infinite loops (`[skip ci]`)
- Workflow files are located in `.github/workflows/`

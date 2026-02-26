# GitHub Workflows

Ce dossier contient les workflows GitHub Actions pour l'automatisation du build et du déploiement.

## 📁 Fichiers

- **`build-docker.yml`** - Build et push automatique des images Docker sur push/PR
- **`deploy-production.yml`** - Déploiement automatique sur Kubernetes (sur tag ou manuel)

## 🔧 Configuration requise

Avant d'utiliser ces workflows, vous devez configurer les secrets GitHub.

👉 **Voir le guide complet : [GITHUB_SECRETS_SETUP.md](./GITHUB_SECRETS_SETUP.md)**

### Secrets requis :

- `KUBECONFIG` - Configuration Kubernetes en base64
- `DATABASE_URL` - URL de votre base de données
- `MAILGUN_API_KEY` - Clé API Mailgun
- `MAILGUN_DOMAIN` - Domaine Mailgun
- `DOCKER_USERNAME` - Username Docker Hub
- `DOCKER_PASSWORD` - Token Docker Hub

## 🚀 Utilisation

### Build automatique

Le workflow `build-docker.yml` se déclenche automatiquement à chaque :
- Push sur `main` ou `develop`
- Pull request vers `main`

Il build et push les images Docker avec les tags appropriés.

### Déploiement en production

Le workflow `deploy-production.yml` peut être déclenché de 2 façons :

#### 1. Automatique sur tag de version

```bash
git tag v1.0.0
git push origin v1.0.0
```

#### 2. Manuel via l'interface GitHub

1. Allez dans **Actions**
2. Sélectionnez **Deploy to Kubernetes Production**
3. Cliquez sur **Run workflow**
4. Choisissez la branche et l'environnement
5. Cliquez sur **Run workflow**

## 📊 Ce que font les workflows

### build-docker.yml

1. ✅ Checkout du code
2. ✅ Build de l'image frontend (Vite + Apache)
3. ✅ Build de l'image backend (Node.js + Hono)
4. ✅ Push vers Docker Hub (seulement sur push, pas sur PR)
5. ✅ Utilise le cache GitHub pour accélérer les builds

### deploy-production.yml

1. ✅ Checkout du code
2. ✅ Build et push des images Docker avec version
3. ✅ Configure kubectl avec KUBECONFIG
4. ✅ Crée/met à jour les secrets Kubernetes
5. ✅ Deploy frontend et backend
6. ✅ Attend que les pods soient prêts
7. ✅ Affiche le statut du déploiement

## 🔍 Monitoring

Une fois le workflow lancé, vous pouvez suivre :
- Les logs en temps réel dans l'onglet **Actions**
- Le statut de chaque étape
- Les erreurs éventuelles

## 🛠️ Personnalisation

### Changer le registre Docker

Par défaut, Docker Hub est utilisé. Pour changer :

```yaml
env:
  REGISTRY: ghcr.io  # GitHub Container Registry
  # ou gcr.io         # Google Container Registry
  # ou xxxxx.dkr.ecr.region.amazonaws.com  # AWS ECR
```

### Ajouter un environnement de staging

Dupliquez `deploy-production.yml` et modifiez :
- Le nom du workflow
- Les secrets utilisés (créez des secrets spécifiques au staging)
- Le namespace Kubernetes cible

### Ajouter des tests

Ajoutez avant le déploiement :

```yaml
- name: Run tests
  run: |
    cd src/backend
    npm install
    npm test
```

## 🔒 Sécurité

Les workflows utilisent :
- ✅ Secrets GitHub chiffrés
- ✅ KUBECONFIG en base64 (jamais exposé dans les logs)
- ✅ Nettoyage automatique du kubeconfig temporaire
- ✅ Permissions minimales

## 📚 Ressources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Docker Build Push Action](https://github.com/docker/build-push-action)
- [Setup kubectl Action](https://github.com/Azure/setup-kubectl)

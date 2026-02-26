# 📚 Index de la Documentation Kubernetes

Ce fichier liste toute la documentation disponible pour le déploiement et la gestion de l'application Inkom Waitlist.

## 🚀 Pour commencer

**Nouveau utilisateur ?** Commencez par identifier votre infrastructure :

### 🖥️ Vous avez un serveur dédié (OVH, Hetzner, Scaleway, etc.) ?
1. 📖 [DEDICATED_SERVER.md](DEDICATED_SERVER.md) - **Guide complet serveur dédié** ⭐
2. 🔐 [SECRETS_AUTOMATION.md](SECRETS_AUTOMATION.md) - Gestion des secrets
3. 📝 [QUICK_REFERENCE.md](QUICK_REFERENCE.md) - Commandes utiles

### ☁️ Vous utilisez un cloud managed (AWS EKS, GKE, AKS) ?
1. 📖 [README.md](README.md) - Guide de déploiement principal
2. 🔐 [SECRETS_AUTOMATION.md](SECRETS_AUTOMATION.md) - **Guide complet** sur les secrets
3. 📝 [QUICK_REFERENCE.md](QUICK_REFERENCE.md) - Commandes utiles

## 📁 Structure de la documentation

```
k8s/
├── README.md                          # Guide de déploiement manuel
├── DEDICATED_SERVER.md                # ⭐ Guide serveur dédié (OVH, Hetzner...)
├── SECRETS_AUTOMATION.md              # Guide complet automatisation secrets
├── QUICK_REFERENCE.md                 # Référence rapide des commandes
├── MULTI_ENV.md                       # Configuration multi-environnements
├── INDEX.md                           # Ce fichier (index)
│
├── Fichiers Kubernetes/
│   ├── frontend-deployment.yaml       # Déploiement frontend
│   ├── backend-deployment.yaml        # Déploiement backend
│   ├── ingress.yaml                   # Routing des domaines
│   └── secrets.example.yaml           # Template de secrets
│
└── scripts/                           # Scripts utilitaires
    ├── create-secrets.sh              # Créer secrets interactif (Linux/Mac)
    ├── create-secrets.ps1             # Créer secrets interactif (Windows)
    ├── debug-secrets.sh               # Déboguer secrets (Linux/Mac)
    ├── debug-secrets.ps1              # Déboguer secrets (Windows)
    ├── deploy.sh                      # Déploiement complet (Linux/Mac)
    └── deploy.ps1                     # Déploiement complet (Windows)
```

## 📖 Guides par cas d'usage

### Je veux déployer rapidement

➡️ **Déploiement automatique avec GitHub Actions** (recommandé)
1. [Configuration des secrets GitHub](../.github/GITHUB_SECRETS_SETUP.md)
2. [Guide d'automatisation](SECRETS_AUTOMATION.md#méthode-1-cicd-avec-github-actions)
3. Pusher un tag : `git tag v1.0.0 && git push origin v1.0.0`

### Je veux déployer manuellement

➡️ **Déploiement manuel**
1. [Guide de déploiement](README.md)
2. Utiliser les scripts : `./deploy.sh` ou `.\deploy.ps1`

### Je veux configurer plusieurs environnements

➡️ **Multi-environnements (staging + production)**
1. [Guide multi-environnements](MULTI_ENV.md)
2. Créer les namespaces et secrets par environnement
3. Configurer les workflows GitHub Actions

### Je veux utiliser un gestionnaire de secrets externe

➡️ **External Secrets Operator**
- [AWS Secrets Manager](SECRETS_AUTOMATION.md#méthode-2-external-secrets-operator)
- Config : [external-secrets-aws.yaml](external-secrets-aws.yaml)
⚠️ **Uniquement si vous utilisez AWS/Azure/GCP**

➡️ **External Secrets Operator**
- [Guide External Secrets](SECRETS_AUTOMATION.md#méthode-2-external-secrets-operator)
- Pour AWS Secrets Manager, Azure Key Vault ou Google Secret Manager
➡️ **Sealed Secrets**
1. [Guide Sealed Secrets](SECRETS_AUTOMATION.md#méthode-3-sealed-secrets)
2. Installer le controller sur le cluster
3. Chiffrer les secrets avant de les commiter

### J'ai un problème avec les secrets

➡️ **Débogage**
1. [Script de debug](scripts/debug-secrets.sh) ou [Windows](scripts/debug-secrets.ps1)
2. [Section troubleshooting](README.md#troubleshooting)

### Je cherche une commande spécifique

➡️ **Référence rapide**
- [QUICK_REFERENCE.md](QUICK_REFERENCE.md) - Toutes les commandes courantes

## 🔐 Documentation des secrets

| Document | Description |
|----------|-------------|
| [SECRETS_AUTOMATION.md](SECRETS_AUTOMATION.md) | **Guide principal** - Toutes les méthodes d'automatisation |
| [../.github/GITHUB_SECRETS_SETUP.md](../.github/GITHUB_SECRETS_SETUP.md) | Configuration des secrets GitHub |
| [secrets.example.yaml](secrets.example.yaml) | Template de secrets Kubernetes |
| [scripts/create-secrets.*](scripts/) | Scripts de création interactive |
| [scripts/debug-secrets.*](scripts/) | Scripts de débogage |

## 🐋 Documentation Docker

| Document | Description |
|----------|-------------|
| [../docker-compose.yml](../docker-compose.yml) | Test local avec Docker Compose |
| [../src/frontend/Dockerfile](../src/frontend/Dockerfile) | Build frontend (Vite + Apache) |
| [../src/backend/Dockerfile](../src/backend/Dockerfile) | Build backend (Node.js + Hono) |

## 🤖 Documentation CI/CD

| Document | Description |
|----------|-------------|
| [../.github/workflows/README.md](../.github/workflows/README.md) | Vue d'ensemble des workflows |
| [../.github/workflows/deploy-production.yml](../.github/workflows/deploy-production.yml) | Workflow de déploiement production|
| [../.github/workflows/build-docker.yml](../.github/workflows/build-docker.yml) | Build et push des images Docker |
| [../.github/GITHUB_SECRETS_SETUP.md](../.github/GITHUB_SECRETS_SETUP.md) | Configuration des secrets GitHub |

## ☸️ Manifests Kubernetes

| Fichier | Description |
|---------|-------------|
| [frontend-deployment.yaml](frontend-deployment.yaml) | Deployment + Service frontend (2 réplicas) |
| [backend-deployment.yaml](backend-deployment.yaml) | Deployment + Service backend (2 réplicas) |
| [ingress.yaml](ingress.yaml) | Ingress pour inkom.ai et api.inkom.ai |
| [secrets.example.yaml](secrets.example.yaml) | Template pour créer les secrets |
| [external-secrets-aws.yaml](external-secrets-aws.yaml) | External Secrets avec AWS |
| [external-secrets-azure.yaml](external-secrets-azure.yaml) | External Secrets avec Azure |
| [external-secrets-gcp.yaml](external-secrets-gcp.yaml) | External Secrets avec GCP |

## 🛠️ Scripts disponibles

### Linux/Mac

| Script | Usage | Description |
|--------|-------|-------------|
| `deploy.sh` | `./deploy.sh` | Déploiement complet automatique |
| `scripts/create-secrets.sh` | `./scripts/create-secrets.sh` | Créer secrets de manière interactive |
| `scripts/debug-secrets.sh` | `./scripts/debug-secrets.sh [namespace]` | Déboguer les secrets |

### Windows PowerShell

| Script | Usage | Description |
|--------|-------|-------------|
| `deploy.ps1` | `.\deploy.ps1` | Déploiement complet automatique |
| `scripts/create-secrets.ps1` | `.\scripts\create-secrets.ps1` | Créer secrets de manière interactive |
| `scripts/debug-secrets.ps1` | `.\scripts\debug-secrets.ps1 [namespace]` | Déboguer les secrets |

## 🎯 Parcours recommandés

### Débutant Kubernetes + Serveur Dédié

1. ✅ Lire [DEDICATED_SERVER.md](DEDICATED_SERVER.md) - Installation complète
2. ✅ Installer K3s sur votre serveur
3. ✅ Configurer GitHub Actions : [GITHUB_SECRETS_SETUP.md](../.github/GITHUB_SECRETS_SETUP.md)
4. ✅ Pusher un tag pour déployer automatiquement
5. ✅ Consulter [QUICK_REFERENCE.md](QUICK_REFERENCE.md) pour les commandes de base

### Utilisateur avancé

1. ✅ Configurer multi-environnements : [MULTI_ENV.md](MULTI_ENV.md)
2. ✅ Mettre en place External Secrets : [SECRETS_AUTOMATION.md](SECRETS_AUTOMATION.md#méthode-2-external-secrets-operator)
3. ✅ Personnaliser les workflows GitHub Actions
4. ✅ Configurer monitoring et alerting

### DevOps/SRE

1. ✅ Tout le parcours utilisateur avancé
2. ✅ Configurer RBAC pour limiter les accès
3. ✅ Mettre en place Sealed Secrets ou External Secrets
4. ✅ Configurer cert-manager pour SSL automatique
5. ✅ Mettre en place autoscaling (HPA)
6. ✅ Configurer Prometheus/Grafana pour monitoring

## 📊 Diagrammes

### Architecture de déploiement

```
┌─────────────────────────────────────────────────────────┐
│                    Internet                              │
└──────────────┬──────────────────────┬───────────────────┘
               │                      │
       ┌───────▼────────┐    ┌───────▼────────┐
       │  inkom.ai      │    │ api.inkom.ai   │
       │  (DNS)         │    │  (DNS)         │
       └───────┬────────┘    └───────┬────────┘
               │                      │
       ┌───────▼──────────────────────▼────────┐
       │      NGINX Ingress Controller         │
       └───────┬──────────────────────┬────────┘
               │                      │
       ┌───────▼────────┐    ┌───────▼────────┐
       │ Frontend Svc   │    │ Backend Svc    │
       └───────┬────────┘    └───────┬────────┘
               │                      │
       ┌───────▼────────┐    ┌───────▼────────┐
       │ Frontend Pods  │    │ Backend Pods   │
       │ (2 réplicas)   │    │ (2 réplicas)   │
       │ Apache:80      │    │ Node.js:3000   │
       └────────────────┘    └───────┬────────┘
                                      │
                             ┌────────▼────────┐
                             │ Backend Secrets │
                             │ - DATABASE_URL  │
                             │ - MAILGUN_*     │
                             └─────────────────┘
```

### Flux de déploiement GitHub Actions

```
┌──────────────┐
│  Git Push    │
│  git tag v*  │
└──────┬───────┘
       │
       ▼
┌──────────────────────┐
│ GitHub Actions       │
│ - Build Docker       │
│ - Push to Registry   │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│ Configure kubectl    │
│ (KUBECONFIG secret)  │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│ Create K8s Secrets   │
│ (from GitHub Secrets)│
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│ Apply Manifests      │
│ - Deployments        │
│ - Services           │
│ - Ingress            │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│ Wait for Ready       │
│ - Check rollout      │
│ - Verify pods        │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│ ✅ Deployed!         │
│ https://inkom.ai     │
└──────────────────────┘
```

## 🆘 Support et contribution

- 🐛 Problèmes : Vérifiez [QUICK_REFERENCE.md](QUICK_REFERENCE.md#diagnostic)
- 📖 Documentation manquante ? Ouvrez une issue
- 💡 Améliorations : Pull requests bienvenues

## 📝 Changelog

Les changements sont documentés via les tags Git. Voir :
```bash
git tag -l -n
```

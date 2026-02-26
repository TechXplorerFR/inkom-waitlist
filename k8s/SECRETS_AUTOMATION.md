# 🔐 Automatisation des Secrets Kubernetes

Ce guide présente plusieurs méthodes pour automatiser l'injection des secrets Kubernetes de manière sécurisée en production.

## �️ Serveur dédié (OVH, Hetzner, etc.) ?

👉 **[Guide spécifique pour serveur dédié](DEDICATED_SERVER.md)** - Configurations adaptées sans cloud provider

## 📋 Table des matières

1. [Méthode 1: CI/CD avec GitHub Actions](#méthode-1-cicd-avec-github-actions) ⭐ **Recommandé** (fonctionne partout)
2. [Méthode 2: External Secrets Operator](#méthode-2-external-secrets-operator) (AWS/Azure/GCP uniquement)
3. [Méthode 3: Sealed Secrets](#méthode-3-sealed-secrets) (parfait pour serveurs dédiés)
4. [Méthode 4: Helm avec values chiffrés](#méthode-4-helm-avec-values-chiffrés)
5. [Méthode 5: Script manuel sécurisé](#méthode-5-script-manuel-sécurisé)

---

## Méthode 1: CI/CD avec GitHub Actions ⭐

**Avantages:**
- ✅ Secrets stockés dans GitHub (chiffrés)
- ✅ Déploiement automatique sur push/tag
- ✅ Pas de secrets dans le code
- ✅ Audit trail complet

### Configuration

#### 1. Ajouter les secrets dans GitHub

Allez dans votre repo: `Settings` → `Secrets and variables` → `Actions` → `New repository secret`

Ajoutez ces secrets:
- `KUBECONFIG` - Votre fichier kubeconfig en base64
- `DATABASE_URL` - URL de votre base de données
- `MAILGUN_API_KEY` - Clé API Mailgun
- `MAILGUN_DOMAIN` - Domaine Mailgun
- `DOCKER_USERNAME` - Votre username Docker Hub
- `DOCKER_PASSWORD` - Votre token Docker Hub

#### 2. Pour obtenir le KUBECONFIG en base64:

```bash
# Linux/Mac
cat ~/.kube/config | base64 -w 0

# Windows PowerShell
[Convert]::ToBase64String([System.IO.File]::ReadAllBytes("$env:USERPROFILE\.kube\config"))
```

#### 3. Utiliser le workflow GitHub Actions

Le fichier `.github/workflows/deploy-production.yml` gère tout automatiquement:

```bash
# Déploiement automatique sur tag
git tag v1.0.0
git push origin v1.0.0

# Ou déploiement manuel via GitHub UI
# Actions → Deploy to Kubernetes → Run workflow
```

**Comment ça marche:**
1. Le workflow se déclenche (sur tag ou manuellement)
2. Build et push des images Docker
3. Configure kubectl avec votre KUBECONFIG
4. Crée/met à jour les secrets Kubernetes depuis les GitHub Secrets
5. Déploie l'application
6. Vérifie que les pods sont prêts

---

## Méthode 2: External Secrets Operator

⚠️ **Note:** Cette méthode nécessite un cloud provider (AWS, Azure, GCP). Si vous êtes sur serveur dédié, utilisez plutôt **Sealed Secrets** (Méthode 3).

**Avantages:**
- ✅ Secrets centralisés dans un vault externe (AWS, Azure, GCP, etc.)
- ✅ Rotation automatique des secrets
- ✅ Synchronisation continue
- ✅ Audit centralisé

### Configuration

#### 1. Installer External Secrets Operator

```bash
helm repo add external-secrets https://charts.external-secrets.io
helm install external-secrets \
   external-secrets/external-secrets \
    -n external-secrets-system \
    --create-namespace
```

#### 2. Utiliser les manifests fournis

Voir le fichier `.github/workflows/external-secrets-*.yaml` selon votre provider:
- `external-secrets-aws.yaml` - AWS Secrets Manager
- `external-secrets-azure.yaml` - Azure Key Vault
- `external-secrets-gcp.yaml` - Google Secret Manager

Une fois configuré, les secrets sont automatiquement synchronisés depuis votre vault externe.

---

## Méthode 3: Sealed Secrets

**Avantages:**
- ✅ Secrets chiffrés versionnables dans Git
- ✅ Seul le cluster peut les déchiffrer
- ✅ Pas de dépendance externe

### Configuration

#### 1. Installer Sealed Secrets Controller

```bash
kubectl apply -f https://github.com/bitnami-labs/sealed-secrets/releases/download/v0.24.0/controller.yaml

# Installer le CLI
wget https://github.com/bitnami-labs/sealed-secrets/releases/download/v0.24.0/kubeseal-linux-amd64
chmod +x kubeseal-linux-amd64
sudo mv kubeseal-linux-amd64 /usr/local/bin/kubeseal
```

#### 2. Créer un Sealed Secret

```bash
# Créer le secret normal
kubectl create secret generic backend-secrets \
  --from-literal=database-url="postgresql://..." \
  --from-literal=mailgun-api-key="key-xxx" \
  --from-literal=mailgun-domain="mg.inkom.ai" \
  --dry-run=client -o yaml > secret.yaml

# Le sceller
kubeseal -f secret.yaml -w sealed-secret.yaml

# Appliquer le sealed secret (peut être versionné dans Git)
kubectl apply -f sealed-secret.yaml

# Nettoyer le secret non chiffré
rm secret.yaml
```

Le fichier `sealed-secret.yaml` peut être commité dans Git car seul votre cluster peut le déchiffrer.

---

## Méthode 4: Helm avec values chiffrés

**Avantages:**
- ✅ Gestion de configuration complète avec Helm
- ✅ Secrets chiffrés avec helm-secrets
- ✅ Templating puissant

### Configuration

#### 1. Installer le plugin helm-secrets

```bash
helm plugin install https://github.com/jkroepke/helm-secrets
```

#### 2. Utiliser les Helm charts fournis

```bash
cd k8s/helm

# Éditer les secrets
helm secrets edit secrets.yaml

# Déployer
helm secrets install inkom-waitlist ./inkom-waitlist -f secrets.yaml
```

---

## Méthode 5: Script manuel sécurisé

Pour des déploiements manuels ponctuels.

### Utiliser le script fourni

```bash
# Linux/Mac
./k8s/scripts/create-secrets.sh

# Windows
.\k8s\scripts\create-secrets.ps1
```

Le script vous demandera interactivement les valeurs et créera les secrets sans les logger.

---

## 🎯 Quelle méthode choisir ?

| **Serveur dédié (OVH, Hetzner, etc.)** | **CI/CD GitHub Actions** ⭐ ou **Sealed Secrets** |
| Situation | Méthode recommandée |
|-----------|---------------------|
| Déploiement automatique avec GitHub | **CI/CD GitHub Actions** ⭐ |
| Infrastructure AWS/Azure/GCP | **External Secrets Operator** |
| Pas d'infrastructure cloud | **Sealed Secrets** |
| Gestion complexe avec Helm | **Helm + helm-secrets** |
| Test/développement | **Script manuel** |

---

## 🔒 Bonnes pratiques

### ✅ À FAIRE
- Utiliser des secrets Kubernetes pour les données sensibles
- Chiffrer les secrets au repos dans etcd
- Limiter l'accès aux secrets avec RBAC
- Faire tourner les secrets régulièrement
- Utiliser des outils d'audit (Falco, OPA)
- Séparer les secrets par environnement (dev/staging/prod)

### ❌ À ÉVITER
- **JAMAIS** commiter des secrets en clair dans Git
- **JAMAIS** logger les secrets dans les applications
- Ne pas partager le même secret entre environnements
- Ne pas donner accès kubectl en production aux développeurs

---

## 📚 Ressources

- [Kubernetes Secrets Best Practices](https://kubernetes.io/docs/concepts/configuration/secret/)
- [External Secrets Operator](https://external-secrets.io/)
- [Sealed Secrets](https://github.com/bitnami-labs/sealed-secrets)
- [GitHub Actions Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)

---

## 🆘 Aide rapide

### Vérifier les secrets

```bash
# Lister les secrets
kubectl get secrets

# Voir un secret (décodé)
kubectl get secret backend-secrets -o json | jq '.data | map_values(@base64d)'
```

### Mettre à jour un secret

```bash
# Méthode 1: kubectl edit
kubectl edit secret backend-secrets

# Méthode 2: kubectl patch
kubectl patch secret backend-secrets -p '{"data":{"mailgun-api-key":"'$(echo -n "new-key" | base64)'"}}' 

# Méthode 3: Supprimer et recréer
kubectl delete secret backend-secrets
kubectl create secret generic backend-secrets --from-literal=...
```

### Forcer le redémarrage après changement de secret

```bash
# Redémarrer les pods backend pour charger le nouveau secret
kubectl rollout restart deployment/backend-deployment
```

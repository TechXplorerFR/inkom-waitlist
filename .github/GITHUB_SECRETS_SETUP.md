# 🔐 Configuration des Secrets GitHub pour CI/CD

Ce guide vous explique comment configurer les secrets GitHub pour permettre le déploiement automatique sur Kubernetes.

## 📋 Secrets requis

Vous devez ajouter les secrets suivants dans votre repository GitHub :

| Secret | Description | Exemple |
|--------|-------------|---------|
| `KUBECONFIG` | Fichier kubeconfig encodé en base64 | (voir ci-dessous) |
| `DATABASE_URL` | URL de connexion à votre base de données | `postgresql://user:pass@host:5432/db` |
| `MAILGUN_API_KEY` | Clé API Mailgun | `key-1234567890abcdef` |
| `MAILGUN_DOMAIN` | Domaine Mailgun configuré | `mg.inkom.ai` |
| `DOCKER_USERNAME` | Username Docker Hub | `votre-username` |
| `DOCKER_PASSWORD` | Token Docker Hub | `dckr_pat_xxxxx` |

## 🚀 Configuration pas à pas

### 1. Ajouter les secrets dans GitHub

1. Allez sur votre repository GitHub
2. Cliquez sur **Settings**
3. Dans le menu latéral, cliquez sur **Secrets and variables** → **Actions**
4. Cliquez sur **New repository secret**
5. Ajoutez chaque secret un par un

### 2. Obtenir le KUBECONFIG en base64

#### Sur Linux/Mac :

```bash
cat ~/.kube/config | base64 -w 0 > kubeconfig-base64.txt
cat kubeconfig-base64.txt
```

#### Sur Windows PowerShell :

```powershell
$kubeconfigPath = "$env:USERPROFILE\.kube\config"
$kubeconfigBase64 = [Convert]::ToBase64String([System.IO.File]::ReadAllBytes($kubeconfigPath))
$kubeconfigBase64 | Out-File -FilePath "kubeconfig-base64.txt" -Encoding ASCII
Get-Content kubeconfig-base64.txt
```

Copiez le contenu du fichier `kubeconfig-base64.txt` et ajoutez-le comme secret `KUBECONFIG`.

⚠️ **Supprimez le fichier après** : `rm kubeconfig-base64.txt`

### 3. Obtenir un Token Docker Hub

1. Connectez-vous sur [Docker Hub](https://hub.docker.com/)
2. Cliquez sur votre profil → **Account Settings**
3. Allez dans **Security** → **Access Tokens**
4. Cliquez sur **New Access Token**
5. Donnez-lui un nom (ex: "GitHub Actions")
6. Permissions : **Read, Write, Delete**
7. Copiez le token généré

Ajoutez :
- `DOCKER_USERNAME` : votre username Docker Hub
- `DOCKER_PASSWORD` : le token généré

### 4. Configuration de la base de données

Pour `DATABASE_URL`, le format dépend de votre base :

**PostgreSQL :**
```
postgresql://username:password@hostname:5432/database_name
```

**MySQL :**
```
mysql://username:password@hostname:3306/database_name
```

**MongoDB :**
```
mongodb://username:password@hostname:27017/database_name
```

**Cassandra (avec Prisma) :**
```
cassandra://username:password@hostname:9042/keyspace
```

### 5. Configuration Mailgun

1. Connectez-vous sur [Mailgun](https://www.mailgun.com/)
2. Allez dans **Sending** → **Domain settings**
3. Sélectionnez votre domaine (ou créez-en un)
4. Copiez :
   - **API Key** → `MAILGUN_API_KEY`
   - **Domain name** → `MAILGUN_DOMAIN` (ex: `mg.inkom.ai`)

## ✅ Vérification

Une fois tous les secrets ajoutés, vous devriez voir ceci dans GitHub :

```
Settings → Secrets and variables → Actions

Repository secrets:
- KUBECONFIG
- DATABASE_URL
- MAILGUN_API_KEY
- MAILGUN_DOMAIN
- DOCKER_USERNAME
- DOCKER_PASSWORD
```

## 🚢 Utilisation

### Déploiement automatique sur tag

```bash
# Créer un tag de version
git tag v1.0.0
git push origin v1.0.0

# Le workflow se déclenche automatiquement
```

### Déploiement manuel

1. Allez dans l'onglet **Actions** de votre repository
2. Sélectionnez le workflow **Deploy to Kubernetes Production**
3. Cliquez sur **Run workflow**
4. Sélectionnez la branche et l'environnement
5. Cliquez sur **Run workflow**

## 🔍 Déboguer un échec de déploiement

Si le workflow échoue :

1. Allez dans **Actions**
2. Cliquez sur le workflow qui a échoué
3. Examinez les logs de chaque étape
4. Vérifiez particulièrement :
   - ✅ Le KUBECONFIG est valide
   - ✅ Les credentials Docker sont corrects
   - ✅ Le cluster Kubernetes est accessible
   - ✅ Les secrets backend sont bien créés

## 🔒 Sécurité

### ✅ Bonnes pratiques

- Les secrets GitHub sont chiffrés au repos
- Ils ne sont jamais exposés dans les logs
- Seuls les workflows peuvent y accéder
- Ils sont masqués dans les outputs des workflows
- Limitez l'accès au repository aux personnes de confiance

### ⚠️ Attention

- Ne commitez **JAMAIS** de secrets dans Git
- Ne partagez **JAMAIS** vos tokens Docker Hub
- Renouvelez régulièrement vos secrets
- Utilisez des credentials différents pour dev/staging/prod

## 🔄 Rotation des secrets

Pour changer un secret :

1. Mettez à jour le secret dans GitHub
2. Relancez le workflow de déploiement
3. Les nouveaux secrets seront automatiquement injectés

## 📚 Ressources

- [GitHub Actions Encrypted Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [Docker Hub Access Tokens](https://docs.docker.com/docker-hub/access-tokens/)
- [Kubernetes Secrets](https://kubernetes.io/docs/concepts/configuration/secret/)

## 🆘 Problèmes courants

### "Error: The process '/usr/bin/kubectl' failed"

➡️ Vérifiez que votre KUBECONFIG est valide et en base64

### "denied: requested access to the resource is denied"

➡️ Vérifiez vos credentials Docker Hub (DOCKER_USERNAME et DOCKER_PASSWORD)

### "Error from server (Forbidden)"

➡️ Votre kubeconfig n'a pas les permissions nécessaires sur le cluster

### Les pods ne démarrent pas

➡️ Vérifiez les secrets Kubernetes avec :
```bash
kubectl get secret backend-secrets -o json | jq '.data | map_values(@base64d)'
```

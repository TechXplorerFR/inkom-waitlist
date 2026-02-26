# 🌍 Configuration Multi-Environnements

Ce guide explique comment configurer plusieurs environnements (staging, production) avec GitHub Actions et Kubernetes.

## 📋 Architecture proposée

```
┌──────────────┐
│  Branche     │  →  Environnement  →  Domaine
├──────────────┤
│  develop     │  →  staging        →  staging.inkom.ai
│  main        │  →  production     →  inkom.ai
│  tags v*.*  │  →  production     →  inkom.ai
└──────────────┘
```

## 🔧 Configuration

### 1. Namespaces Kubernetes

Créez des namespaces séparés :

```bash
kubectl create namespace production
kubectl create namespace staging
```

### 2. Secrets par environnement

#### Production
```bash
kubectl create secret generic backend-secrets \
  -n production \
  --from-literal=database-url="postgresql://..." \
  --from-literal=mailgun-api-key="key-xxx" \
  --from-literal=mailgun-domain="mg.inkom.ai"
```

#### Staging
```bash
kubectl create secret generic backend-secrets \
  -n staging \
  --from-literal=database-url="postgresql://staging..." \
  --from-literal=mailgun-api-key="key-yyy" \
  --from-literal=mailgun-domain="staging-mg.inkom.ai"
```

### 3. Secrets GitHub par environnement

Dans GitHub, ajoutez des **Environment secrets** :

1. Allez dans **Settings** → **Environments**
2. Cliquez sur **New environment**
3. Créez deux environnements : `production` et `staging`

#### Pour chaque environnement, ajoutez :

**Production:**
- `DATABASE_URL` → base de données de production
- `MAILGUN_API_KEY` → clé Mailgun de production
- `MAILGUN_DOMAIN` → domaine de production

**Staging:**
- `DATABASE_URL` → base de données de staging
- `MAILGUN_API_KEY` → clé Mailgun de staging
- `MAILGUN_DOMAIN` → domaine de staging

Les secrets communs (KUBECONFIG, DOCKER_*) restent au niveau repository.

### 4. Workflow pour staging

Créez `.github/workflows/deploy-staging.yml` :

```yaml
name: Deploy to Staging

on:
  push:
    branches:
      - develop
  workflow_dispatch:

env:
  REGISTRY: docker.io
  FRONTEND_IMAGE_NAME: ${{ secrets.DOCKER_USERNAME }}/inkom-frontend
  BACKEND_IMAGE_NAME: ${{ secrets.DOCKER_USERNAME }}/inkom-backend
  NAMESPACE: staging

jobs:
  deploy-staging:
    runs-on: ubuntu-latest
    environment: staging  # Utilise les secrets de l'environnement staging
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4

    - name: Set up Docker Buildx
      uses: docker/setup-buildx-action@v3

    - name: Log in to Docker Hub
      uses: docker/login-action@v3
      with:
        username: ${{ secrets.DOCKER_USERNAME }}
        password: ${{ secrets.DOCKER_PASSWORD }}

    - name: Build and push Frontend
      uses: docker/build-push-action@v5
      with:
        context: ./src/frontend
        push: true
        tags: ${{ env.FRONTEND_IMAGE_NAME }}:staging
        cache-from: type=gha
        cache-to: type=gha,mode=max

    - name: Build and push Backend
      uses: docker/build-push-action@v5
      with:
        context: ./src/backend
        push: true
        tags: ${{ env.BACKEND_IMAGE_NAME }}:staging
        cache-from: type=gha
        cache-to: type=gha,mode=max

    - name: Set up kubectl
      uses: azure/setup-kubectl@v3

    - name: Configure kubectl
      run: |
        echo "${{ secrets.KUBECONFIG }}" | base64 -d > kubeconfig.yaml
        export KUBECONFIG=./kubeconfig.yaml

    - name: Create/Update secrets in staging namespace
      env:
        KUBECONFIG: ./kubeconfig.yaml
      run: |
        kubectl delete secret backend-secrets -n staging --ignore-not-found=true
        kubectl create secret generic backend-secrets \
          -n staging \
          --from-literal=database-url="${{ secrets.DATABASE_URL }}" \
          --from-literal=mailgun-api-key="${{ secrets.MAILGUN_API_KEY }}" \
          --from-literal=mailgun-domain="${{ secrets.MAILGUN_DOMAIN }}"

    - name: Update deployment images
      env:
        KUBECONFIG: ./kubeconfig.yaml
      run: |
        sed -i "s|YOUR_REGISTRY/inkom-frontend:latest|${{ env.FRONTEND_IMAGE_NAME }}:staging|g" k8s/frontend-deployment.yaml
        sed -i "s|YOUR_REGISTRY/inkom-backend:latest|${{ env.BACKEND_IMAGE_NAME }}:staging|g" k8s/backend-deployment.yaml
        sed -i "s|namespace: default|namespace: staging|g" k8s/*.yaml

    - name: Deploy to staging
      env:
        KUBECONFIG: ./kubeconfig.yaml
      run: |
        kubectl apply -f k8s/ -n staging
        kubectl rollout status deployment/frontend-deployment -n staging --timeout=5m
        kubectl rollout status deployment/backend-deployment -n staging --timeout=5m

    - name: Cleanup
      if: always()
      run: rm -f kubeconfig.yaml
```

### 5. Ingress multi-environnements

Créez `k8s/ingress-staging.yaml` :

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: inkom-ingress-staging
  namespace: staging
  annotations:
    kubernetes.io/ingress.class: "nginx"
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
spec:
  tls:
  - hosts:
    - staging.inkom.ai
    - api-staging.inkom.ai
    secretName: inkom-staging-tls
  rules:
  - host: staging.inkom.ai
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: frontend-service
            port:
              number: 80
  - host: api-staging.inkom.ai
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: backend-service
            port:
              number: 80
```

### 6. DNS Configuration

Configurez vos DNS :

```
# Production
inkom.ai          A    <INGRESS_IP>
api.inkom.ai      A    <INGRESS_IP>

# Staging
staging.inkom.ai      A    <INGRESS_IP>
api-staging.inkom.ai  A    <INGRESS_IP>
```

## 🚀 Workflow de déploiement

### Développement → Staging

```bash
git checkout develop
git add .
git commit -m "New feature"
git push origin develop

# Le déploiement sur staging se fait automatiquement
```

### Staging → Production

#### Option 1: Via pull request (recommandé)
```bash
# 1. Créer une PR de develop vers main
# 2. Review et tests
# 3. Merge dans main
# 4. Créer un tag
git checkout main
git pull
git tag v1.0.0
git push origin v1.0.0
```

#### Option 2: Déploiement manuel
```bash
# Via GitHub UI
# Actions → Deploy to Production → Run workflow
```

## 🔍 Vérification

### Staging
```bash
# Status
kubectl get pods -n staging
kubectl get ingress -n staging

# Logs
kubectl logs -l app=inkom-backend -n staging -f

# URL
echo "Frontend: https://staging.inkom.ai"
echo "API: https://api-staging.inkom.ai"
```

### Production
```bash
# Status
kubectl get pods -n production
kubectl get ingress -n production

# Logs
kubectl logs -l app=inkom-backend -n production -f

# URL
echo "Frontend: https://inkom.ai"
echo "API: https://api.inkom.ai"
```

## 🔒 Protection de production

Dans GitHub, configurez des **branch protection rules** :

1. **Settings** → **Branches** → **Add rule**
2. Branch name pattern: `main`
3. Activez :
   - ✅ Require a pull request before merging
   - ✅ Require approvals (1+)
   - ✅ Require status checks to pass
   - ✅ Require branches to be up to date

Pour l'environnement production :
1. **Settings** → **Environments** → **production**
2. **Deployment protection rules** :
   - ✅ Required reviewers (ajoutez-vous ou votre équipe)
   - ✅ Wait timer: 5 minutes (optionnel)

## 📊 Variables d'environnement par environnement

### Frontend

#### Production (.env.production)
```bash
VITE_API_URL=https://api.inkom.ai
VITE_ENV=production
```

#### Staging (.env.staging)
```bash
VITE_API_URL=https://api-staging.inkom.ai
VITE_ENV=staging
```

Modifiez le Dockerfile frontend pour accepter un argument :

```dockerfile
FROM node:20-alpine AS build
WORKDIR /app

ARG ENV=production
COPY package*.json ./
RUN npm install
COPY . .
RUN cp .env.${ENV} .env.production || true
RUN npm run build

# ... reste du Dockerfile
```

Et dans le workflow :

```yaml
- name: Build Frontend
  uses: docker/build-push-action@v5
  with:
    context: ./src/frontend
    build-args: |
      ENV=staging  # ou production
    push: true
    tags: ${{ env.FRONTEND_IMAGE_NAME }}:staging
```

## 🎯 Récapitulatif

| Environnement | Branche | Trigger | Namespace | Domaine |
|---------------|---------|---------|-----------|---------|
| Staging | develop | Auto (push) | staging | staging.inkom.ai |
| Production | main | Manuel/Tag | production | inkom.ai |

## 📚 Bonnes pratiques

1. ✅ Toujours tester en staging avant production
2. ✅ Utiliser des bases de données séparées
3. ✅ Limiter l'accès à la production (protection branches)
4. ✅ Logger et monitorer chaque environnement séparément
5. ✅ Avoir des secrets différents par environnement
6. ✅ Documenter chaque déploiement (via tags Git)

# Guide de Déploiement Kubernetes - Inkom Waitlist

Ce guide explique comment déployer l'application Inkom Waitlist sur Kubernetes avec les domaines `inkom.ai` (frontend) et `api.inkom.ai` (backend).

## 🔐 Configurations recommandées

### 🖥️ Serveur dédié (OVH, Hetzner, etc.) ?
**👉 [Guide spécifique serveur dédié](./DEDICATED_SERVER.md)** - Installation K3s, configuration réseau, SSL, etc.

### ☁️ Cloud managed (AWS, GCP, Azure) ?
**👉 [Guide des secrets](./SECRETS_AUTOMATION.md)** - External Secrets Operator, intégration cloud-native

### 🤖 Déploiement avec GitHub Actions (recommandé pour tous)
**👉 [Configuration GitHub Actions](../.github/GITHUB_SECRETS_SETUP.md)** - Déploiement automatique

Ce guide vous montre comment :
- ✅ Déployer automatiquement via GitHub Actions (fonctionne partout)
- ✅ Utiliser External Secrets Operator (AWS, Azure, GCP uniquement)
- ✅ Gérer les secrets de manière sécurisée
- ✅ Scripts utilitaires pour créer/déboguer les secrets

Le reste de ce document explique le déploiement manuel.

---

## �📋 Prérequis

- Un cluster Kubernetes fonctionnel
- `kubectl` configuré pour accéder à votre cluster
- Docker installé localement
- Un registre Docker (Docker Hub, Google Container Registry, AWS ECR, etc.)
- NGINX Ingress Controller installé sur votre cluster
- (Optionnel) cert-manager pour les certificats SSL automatiques

## 🏗️ Architecture

```
┌─────────────┐         ┌──────────────┐         ┌──────────────┐
│   inkom.ai  │────────▶│   Frontend   │────────▶│  Apache/80   │
│  (Ingress)  │         │  (2 pods)    │         │  Vite Build  │
└─────────────┘         └──────────────┘         └──────────────┘

┌─────────────┐         ┌──────────────┐         ┌──────────────┐
│api.inkom.ai │────────▶│   Backend    │────────▶│  Node.js     │
│  (Ingress)  │         │  (2 pods)    │         │  Hono/3000   │
└─────────────┘         └──────────────┘         └──────────────┘
```

## 🚀 Étape 1 : Build et Push des Images Docker

### Frontend

```bash
cd src/frontend

# Build l'image
docker build -t YOUR_REGISTRY/inkom-frontend:latest .

# Push vers le registre
docker push YOUR_REGISTRY/inkom-frontend:latest
```

### Backend

```bash
cd src/backend

# Build l'image
docker build -t YOUR_REGISTRY/inkom-backend:latest .

# Push vers le registre
docker push YOUR_REGISTRY/inkom-backend:latest
```

**Note :** Remplacez `YOUR_REGISTRY` par votre registre Docker actuel (ex: `docker.io/username`, `gcr.io/project-id`, etc.)

## 🔐 Étape 2 : Configurer les Secrets

Créez un fichier `secrets.yaml` à partir de l'exemple :

```bash
cd k8s
cp secrets.example.yaml secrets.yaml
```

Modifiez `secrets.yaml` avec vos vraies valeurs :

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: backend-secrets
type: Opaque
stringData:
  database-url: "postgresql://user:password@host:5432/inkom_db"
  mailgun-api-key: "key-xxxxxxxxxxxxxxxxxxxxxx"
  mailgun-domain: "mg.inkom.ai"
```

Appliquez le secret :

```bash
kubectl apply -f secrets.yaml
```

**⚠️ Important :** Ne committez JAMAIS `secrets.yaml` avec de vraies valeurs dans Git ! Ajoutez-le au `.gitignore`.

## 📝 Étape 3 : Mettre à jour les Manifests

### Modifier les images dans les deployments

Éditez `k8s/frontend-deployment.yaml` et `k8s/backend-deployment.yaml` pour remplacer `YOUR_REGISTRY` par votre vrai registre :

```yaml
# Dans frontend-deployment.yaml
image: docker.io/username/inkom-frontend:latest

# Dans backend-deployment.yaml
image: docker.io/username/inkom-backend:latest
```

### Vérifier les variables d'environnement

Dans `k8s/backend-deployment.yaml`, assurez-vous que `FRONTEND_URL` pointe vers votre domaine :

```yaml
env:
- name: FRONTEND_URL
  value: "https://inkom.ai"
```

## 🌐 Étape 4 : Configurer les DNS

Pointez vos domaines vers l'IP de votre Ingress Controller :

```
inkom.ai        A    <INGRESS_IP>
www.inkom.ai    A    <INGRESS_IP>
api.inkom.ai    A    <INGRESS_IP>
```

Pour obtenir l'IP de l'Ingress :

```bash
kubectl get svc -n ingress-nginx
```

## 🚢 Étape 5 : Déployer sur Kubernetes

Déployez tous les manifests :

```bash
# Depuis la racine du projet
kubectl apply -f k8s/

# Ou individuellement
kubectl apply -f k8s/frontend-deployment.yaml
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/ingress.yaml
```

## ✅ Étape 6 : Vérifier le déploiement

```bash
# Vérifier les pods
kubectl get pods

# Vérifier les services
kubectl get svc

# Vérifier l'ingress
kubectl get ingress

# Voir les logs du backend
kubectl logs -l app=inkom-backend --tail=50

# Voir les logs du frontend
kubectl logs -l app=inkom-frontend --tail=50
```

## 🔒 Étape 7 : HTTPS avec cert-manager (Optionnel mais recommandé)

Si vous avez cert-manager installé :

```bash
# Installer cert-manager si pas déjà fait
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.13.0/cert-manager.yaml

# Créer un ClusterIssuer Let's Encrypt
kubectl apply -f - <<EOF
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    server: https://acme-v02.api.letsencrypt.org/directory
    email: your-email@example.com
    privateKeySecretRef:
      name: letsencrypt-prod
    solvers:
    - http01:
        ingress:
          class: nginx
EOF
```

Les certificats seront automatiquement générés grâce aux annotations dans `ingress.yaml`.

## 🔄 Mise à jour de l'application

Pour mettre à jour l'application :

```bash
# 1. Build et push la nouvelle image avec un tag
docker build -t YOUR_REGISTRY/inkom-frontend:v1.1.0 ./src/frontend
docker push YOUR_REGISTRY/inkom-frontend:v1.1.0

# 2. Mettre à jour le deployment
kubectl set image deployment/frontend-deployment frontend=YOUR_REGISTRY/inkom-frontend:v1.1.0

# 3. Vérifier le rollout
kubectl rollout status deployment/frontend-deployment
```

Ou utilisez `kubectl apply` après avoir modifié le YAML :

```bash
# Modifier le tag de l'image dans le fichier YAML
kubectl apply -f k8s/frontend-deployment.yaml
```

## 🔍 Troubleshooting

### Les pods ne démarrent pas

```bash
# Voir les événements
kubectl describe pod <pod-name>

# Voir les logs
kubectl logs <pod-name>
```

### L'ingress ne route pas correctement

```bash
# Vérifier la configuration de l'ingress
kubectl describe ingress inkom-ingress

# Vérifier les logs du controller
kubectl logs -n ingress-nginx -l app.kubernetes.io/name=ingress-nginx
```

### Erreurs de connexion à la base de données

```bash
# Vérifier que les secrets sont bien créés
kubectl get secrets
kubectl describe secret backend-secrets

# Vérifier les variables d'environnement du pod
kubectl exec -it <backend-pod-name> -- env | grep DATABASE
```

## 📊 Monitoring et Logs

Pour suivre les logs en temps réel :

```bash
# Backend
kubectl logs -f -l app=inkom-backend

# Frontend
kubectl logs -f -l app=inkom-frontend
```

## 🔧 Configuration avancée

### Ajuster les ressources

Modifiez les limites de ressources dans les deployments selon vos besoins :

```yaml
resources:
  requests:
    memory: "256Mi"
    cpu: "100m"
  limits:
    memory: "512Mi"
    cpu: "500m"
```

### Scaling horizontal

```bash
# Augmenter le nombre de réplicas
kubectl scale deployment/backend-deployment --replicas=3
kubectl scale deployment/frontend-deployment --replicas=3

# Ou modifier directement dans les YAML et reappliquer
```

### Autoscaling

Créez un HorizontalPodAutoscaler :

```bash
kubectl autoscale deployment backend-deployment --cpu-percent=50 --min=2 --max=10
```

## 📚 Ressources supplémentaires

- [Documentation Kubernetes](https://kubernetes.io/docs/)
- [NGINX Ingress Controller](https://kubernetes.github.io/ingress-nginx/)
- [cert-manager](https://cert-manager.io/)

---

**🎉 Votre application est maintenant déployée et accessible sur `https://inkom.ai` !**

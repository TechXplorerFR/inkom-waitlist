# 📝 Référence Rapide - Commandes Utiles

## 🚀 Déploiement

### GitHub Actions (Automatique)
```bash
# Déploiement via tag
git tag v1.0.0
git push origin v1.0.0

# Ou manuel via GitHub UI:
# Actions → Deploy to Kubernetes → Run workflow
```

### Script de déploiement local
```bash
# Linux/Mac
cd k8s && ./deploy.sh

# Windows
cd k8s; .\deploy.ps1
```

## 🔐 Gestion des Secrets

### Créer les secrets de manière interactive
```bash
# Linux/Mac
./k8s/scripts/create-secrets.sh

# Windows
.\k8s\scripts\create-secrets.ps1
```

### Vérifier les secrets
```bash
# Lister
kubectl get secrets

# Afficher (décodé)
kubectl get secret backend-secrets -o json | jq '.data | map_values(@base64d)'

# Debug complet
./k8s/scripts/debug-secrets.sh
```

### Mettre à jour un secret
```bash
# Supprimer et recréer
kubectl delete secret backend-secrets
./k8s/scripts/create-secrets.sh

# Ou via kubectl patch
kubectl patch secret backend-secrets -p '{"data":{"database-url":"'$(echo -n "new-value" | base64)'"}}'
```

## 📦 Docker

### Build local
```bash
# Frontend
docker build -t inkom-frontend ./src/frontend

# Backend
docker build -t inkom-backend ./src/backend

# Les deux avec Docker Compose
docker-compose build
```

### Test local
```bash
docker-compose up -d
# Frontend: http://localhost:8080
# Backend: http://localhost:3000

docker-compose logs -f
docker-compose down
```

### Push vers registre
```bash
docker login
docker tag inkom-frontend your-username/inkom-frontend:v1.0.0
docker push your-username/inkom-frontend:v1.0.0
```

## ☸️ Kubernetes

### Déploiement
```bash
# Appliquer tous les manifests
kubectl apply -f k8s/

# Ou individuellement
kubectl apply -f k8s/frontend-deployment.yaml
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/ingress.yaml
```

### Surveillance
```bash
# Status des pods
kubectl get pods
kubectl get pods -l app=inkom-backend
kubectl get pods -l app=inkom-frontend

# Status des services
kubectl get svc

# Status de l'ingress
kubectl get ingress

# Tout en mode watch
kubectl get pods -w
```

### Logs
```bash
# Logs backend
kubectl logs -l app=inkom-backend --tail=50
kubectl logs -l app=inkom-backend -f  # Follow

# Logs frontend
kubectl logs -l app=inkom-frontend --tail=50

# Logs d'un pod spécifique
kubectl logs <pod-name>
```

### Débogage
```bash
# Décrire un pod
kubectl describe pod <pod-name>

# Entrer dans un pod
kubectl exec -it <pod-name> -- sh

# Voir les événements
kubectl get events --sort-by='.lastTimestamp'

# Variables d'environnement d'un pod
kubectl exec <pod-name> -- env
```

### Mise à jour
```bash
# Changer l'image
kubectl set image deployment/backend-deployment backend=username/inkom-backend:v1.1.0

# Redémarrer un deployment
kubectl rollout restart deployment/backend-deployment

# Vérifier le rollout
kubectl rollout status deployment/backend-deployment

# Historique des rollouts
kubectl rollout history deployment/backend-deployment

# Rollback
kubectl rollout undo deployment/backend-deployment
```

### Scaling
```bash
# Horizontal scaling
kubectl scale deployment/backend-deployment --replicas=3

# Autoscaling
kubectl autoscale deployment/backend-deployment --cpu-percent=50 --min=2 --max=10
```

### Nettoyage
```bash
# Supprimer les ressources
kubectl delete -f k8s/

# Ou individuellement
kubectl delete deployment frontend-deployment
kubectl delete deployment backend-deployment
kubectl delete service frontend-service
kubectl delete service backend-service
kubectl delete ingress inkom-ingress
```

## 🔍 Diagnostic

### Vérifier la connexion au cluster
```bash
kubectl cluster-info
kubectl get nodes
```

### Problèmes courants

**Les pods ne démarrent pas :**
```bash
kubectl describe pod <pod-name>
kubectl logs <pod-name>
```

**Problème de secrets :**
```bash
./k8s/scripts/debug-secrets.sh
```

**L'ingress ne fonctionne pas :**
```bash
kubectl describe ingress inkom-ingress
kubectl logs -n ingress-nginx -l app.kubernetes.io/name=ingress-nginx
```

**Problèmes réseau :**
```bash
# Tester depuis un pod
kubectl run -i --tty debug --image=busybox --restart=Never -- sh
# Dans le container:
wget -O- http://backend-service
```

## 🔧 Configuration

### Obtenir le kubeconfig en base64
```bash
# Linux/Mac
cat ~/.kube/config | base64 -w 0

# Windows PowerShell
[Convert]::ToBase64String([System.IO.File]::ReadAllBytes("$env:USERPROFILE\.kube\config"))
```

### Obtenir l'IP de l'Ingress
```bash
kubectl get svc -n ingress-nginx
```

### Configurer les DNS
```
inkom.ai        A    <INGRESS_IP>
www.inkom.ai    A    <INGRESS_IP>
api.inkom.ai    A    <INGRESS_IP>
```

## 📊 Monitoring en continu

### Terminal 1: Pods
```bash
watch -n 2 kubectl get pods
```

### Terminal 2: Logs backend
```bash
kubectl logs -l app=inkom-backend -f
```

### Terminal 3: Logs frontend
```bash
kubectl logs -l app=inkom-frontend -f
```

## 🆘 Aide rapide

### Commandes essentielles
```bash
kubectl get all                          # Voir toutes les ressources
kubectl get pods -o wide                 # Pods avec plus de détails
kubectl top pods                         # Utilisation CPU/Mémoire
kubectl describe <resource> <name>       # Détails d'une ressource
kubectl logs <pod> -c <container>        # Logs d'un container spécifique
kubectl exec -it <pod> -- <command>      # Exécuter une commande dans un pod
kubectl port-forward <pod> 8080:80       # Forward de port
```

### Ressources utiles
```bash
kubectl explain pods                     # Documentation d'une ressource
kubectl api-resources                    # Liste des types de ressources
kubectl version                          # Version de kubectl et du cluster
```

## 🔐 Sécurité

### Vérifier les permissions
```bash
kubectl auth can-i create pods
kubectl auth can-i delete secrets
```

### Voir les secrets (attention!)
```bash
# Lister
kubectl get secrets

# Voir les clés (pas les valeurs)
kubectl get secret backend-secrets -o jsonpath='{.data}' | jq 'keys'

# Voir une valeur spécifique
kubectl get secret backend-secrets -o jsonpath='{.data.database-url}' | base64 -d
```

## 📚 Documentation

- **Déploiement complet**: [k8s/README.md](../README.md)
- **Automatisation secrets**: [k8s/SECRETS_AUTOMATION.md](../SECRETS_AUTOMATION.md)
- **GitHub Actions**: [.github/GITHUB_SECRETS_SETUP.md](../../.github/GITHUB_SECRETS_SETUP.md)
- **Workflows**: [.github/workflows/README.md](../../.github/workflows/README.md)

# 🖥️ Configuration pour Serveur Dédié (OVH, Hetzner, etc.)

Ce guide est spécifiquement pour les déploiements sur serveurs dédiés **sans** plateforme cloud managed.

## ✅ Ce qui fonctionne sur serveur dédié

Toutes les configurations principales fonctionnent parfaitement :
- ✅ Docker & Kubernetes
- ✅ GitHub Actions pour CI/CD
- ✅ Sealed Secrets
- ✅ Scripts manuels
- ✅ Multi-environnements

## ❌ Ce qui ne s'applique PAS

- ❌ External Secrets avec cloud providers (AWS, Azure, GCP)
  - Vous n'avez pas besoin de ces fichiers si vous êtes sur dédié

## 🎯 Configuration recommandée

### Architecture type serveur dédié OVH

```
┌─────────────────────────────────────────┐
│     Serveur Dédié OVH                   │
│                                         │
│  ┌────────────────────────────────┐    │
│  │   Kubernetes (K3s/kubeadm)     │    │
│  │                                 │    │
│  │  ┌──────────┐  ┌──────────┐   │    │
│  │  │ Frontend │  │ Backend  │   │    │
│  │  │  Pods    │  │  Pods    │   │    │
│  │  └──────────┘  └──────────┘   │    │
│  │                                 │    │
│  │  ┌──────────────────────────┐ │    │
│  │  │  NGINX Ingress           │ │    │
│  │  │  Port 80/443             │ │    │
│  │  └──────────┬───────────────┘ │    │
│  └─────────────┼─────────────────┘    │
│                │                       │
└────────────────┼───────────────────────┘
                 │
        ┌────────▼────────┐
        │   IP Publique   │
        │   OVH           │
        └─────────────────┘
                 ▲
        ┌────────┴────────┐
        │   DNS            │
        │   inkom.ai      │
        └─────────────────┘
```

## 🚀 Installation Kubernetes sur serveur dédié

### Option 1: K3s (Recommandé pour débutants)

K3s est une distribution Kubernetes légère, parfaite pour les serveurs dédiés.

```bash
# Installation en une commande
curl -sfL https://get.k3s.io | sh -

# Vérifier l'installation
sudo k3s kubectl get nodes

# Récupérer le kubeconfig
sudo cat /etc/rancher/k3s/k3s.yaml > ~/.kube/config
# Éditer et remplacer 127.0.0.1 par l'IP publique de votre serveur
sed -i 's/127.0.0.1/VOTRE_IP_PUBLIQUE/g' ~/.kube/config
```

### Option 2: Kubeadm (Plus standard)

```bash
# Installer Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Installer kubeadm, kubelet, kubectl
# Voir: https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/install-kubeadm/

# Initialiser le cluster
sudo kubeadm init --pod-network-cidr=10.244.0.0/16

# Configurer kubectl
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
```

### Installer NGINX Ingress Controller

```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.1/deploy/static/provider/baremetal/deploy.yaml

# Exposer l'ingress sur les ports 80 et 443
# Éditer le service pour utiliser NodePort ou HostNetwork
kubectl edit svc ingress-nginx-controller -n ingress-nginx
```

## 🔐 Gestion des secrets - Méthode recommandée pour dédié

### Option 1: GitHub Actions (⭐ RECOMMANDÉ)

**Pourquoi c'est parfait pour vous :**
- ✅ Déploiement automatique depuis votre repo
- ✅ Secrets stockés de manière sécurisée dans GitHub
- ✅ Pas besoin de cloud provider
- ✅ Workflow déjà créé et prêt à l'emploi

**Configuration :**

1. **Récupérer votre KUBECONFIG depuis le serveur :**

```bash
# Sur votre serveur OVH
cat ~/.kube/config | base64 -w 0
```

2. **Ajouter les secrets dans GitHub :**

Settings → Secrets → Actions → New secret :
- `KUBECONFIG` : le base64 de votre kubeconfig
- `DATABASE_URL` : votre base de données
- `MAILGUN_API_KEY` : votre clé Mailgun
- `MAILGUN_DOMAIN` : votre domaine Mailgun
- `DOCKER_USERNAME` : votre Docker Hub username
- `DOCKER_PASSWORD` : votre Docker Hub token

3. **Déployer :**

```bash
git tag v1.0.0
git push origin v1.0.0
# GitHub Actions déploie automatiquement sur votre serveur OVH
```

### Option 2: Sealed Secrets (Alternative sans GitHub)

Si vous préférez ne pas utiliser GitHub Actions :

```bash
# 1. Installer Sealed Secrets sur votre cluster
kubectl apply -f https://github.com/bitnami-labs/sealed-secrets/releases/download/v0.24.0/controller.yaml

# 2. Installer le CLI kubeseal
wget https://github.com/bitnami-labs/sealed-secrets/releases/download/v0.24.0/kubeseal-0.24.0-linux-amd64.tar.gz
tar xfz kubeseal-0.24.0-linux-amd64.tar.gz
sudo install -m 755 kubeseal /usr/local/bin/kubeseal

# 3. Créer et sceller un secret
kubectl create secret generic backend-secrets \
  --from-literal=database-url="postgresql://..." \
  --from-literal=mailgun-api-key="key-xxx" \
  --from-literal=mailgun-domain="mg.inkom.ai" \
  --dry-run=client -o yaml | \
  kubeseal -o yaml > sealed-secret.yaml

# 4. Appliquer (peut être versionné dans Git!)
kubectl apply -f sealed-secret.yaml
```

### Option 3: Scripts manuels (Le plus simple pour débuter)

```bash
# Utiliser le script fourni
./k8s/scripts/create-secrets.sh
```

## 🌐 Configuration DNS

Chez OVH, configurez vos enregistrements DNS :

```
Type  | Nom              | Cible
------|------------------|------------------
A     | @                | IP_PUBLIQUE_OVH
A     | www              | IP_PUBLIQUE_OVH
A     | api              | IP_PUBLIQUE_OVH
```

Ou via l'interface OVH :
1. Manager OVH → Domaines → inkom.ai
2. Zone DNS → Ajouter une entrée
3. Type A, cible = votre IP publique

## 🔒 SSL/TLS avec Let's Encrypt

### Installer cert-manager

```bash
# Installer cert-manager
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.13.0/cert-manager.yaml

# Créer un ClusterIssuer Let's Encrypt
cat <<EOF | kubectl apply -f -
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    server: https://acme-v02.api.letsencrypt.org/directory
    email: votre-email@example.com
    privateKeySecretRef:
      name: letsencrypt-prod
    solvers:
    - http01:
        ingress:
          class: nginx
EOF
```

Les certificats SSL seront générés automatiquement grâce aux annotations dans `ingress.yaml`.

## 📊 Monitoring

### Logs simples

```bash
# Backend logs
kubectl logs -l app=inkom-backend -f

# Frontend logs
kubectl logs -l app=inkom-frontend -f
```

### Monitoring avancé (optionnel)

```bash
# Installer Prometheus + Grafana
kubectl create namespace monitoring
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm install prometheus prometheus-community/kube-prometheus-stack -n monitoring
```

## 🔧 Optimisations pour serveur unique

### Ajuster les ressources

Dans vos deployments, adaptez les ressources selon votre serveur :

```yaml
# Pour un serveur avec 16GB RAM par exemple
resources:
  requests:
    memory: "128Mi"
    cpu: "100m"
  limits:
    memory: "256Mi"
    cpu: "500m"
```

### Utiliser des réplicas réduits

Si vous avez un seul serveur, vous pouvez réduire à 1 réplica :

```yaml
spec:
  replicas: 1  # Au lieu de 2
```

## 🚀 Déploiement complet sur OVH

### 1. Préparer le serveur

```bash
# SSH sur votre serveur
ssh root@votre-ip-ovh

# Installer K3s
curl -sfL https://get.k3s.io | sh -

# Installer NGINX Ingress
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.1/deploy/static/provider/baremetal/deploy.yaml

# Installer cert-manager pour SSL
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.13.0/cert-manager.yaml
```

### 2. Configurer GitHub Actions

```bash
# Récupérer le kubeconfig
sudo cat /etc/rancher/k3s/k3s.yaml | sed 's/127.0.0.1/VOTRE_IP_OVH/g' | base64 -w 0

# Ajouter ce kubeconfig comme secret GitHub (KUBECONFIG)
```

### 3. Déployer

```bash
# Depuis votre machine locale
git tag v1.0.0
git push origin v1.0.0

# GitHub Actions déploie automatiquement sur votre serveur OVH
```

## 🔍 Vérification

```bash
# Status du cluster
kubectl get nodes
kubectl get pods --all-namespaces

# Vérifier l'ingress
kubectl get ingress

# Tester l'accès
curl https://inkom.ai
curl https://api.inkom.ai/
```

## ⚡ Performance

### Optimisations pour serveur dédié

1. **Limiter les logs** :
```bash
# Dans K3s config
--container-runtime-endpoint=/run/containerd/containerd.sock \
--log /dev/null
```

2. **Utiliser un SSD** si disponible pour etcd

3. **Configurer le swap** :
```bash
# Désactiver le swap (recommandé pour Kubernetes)
sudo swapoff -a
```

## 🆘 Troubleshooting spécifique serveur dédié

### Le cluster n'est pas accessible de l'extérieur

```bash
# Vérifier le firewall
sudo ufw status
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 6443/tcp  # API Kubernetes
```

### L'ingress ne fonctionne pas

```bash
# Vérifier le service ingress
kubectl get svc -n ingress-nginx

# Exposer sur les bons ports
kubectl patch svc ingress-nginx-controller -n ingress-nginx -p '{"spec":{"type":"NodePort","ports":[{"port":80,"nodePort":30080},{"port":443,"nodePort":30443}]}}'
```

## 📚 Ressources

- [K3s Documentation](https://docs.k3s.io/)
- [OVH Kubernetes Guide](https://docs.ovh.com/gb/en/)
- [Sealed Secrets](https://github.com/bitnami-labs/sealed-secrets)
- [cert-manager](https://cert-manager.io/)

## ✅ Checklist finale

- [ ] K3s ou kubeadm installé
- [ ] NGINX Ingress configuré
- [ ] cert-manager installé (pour SSL)
- [ ] DNS configurés sur OVH
- [ ] Secrets GitHub configurés
- [ ] Firewall ouvert (80, 443, 6443)
- [ ] Premier déploiement réussi

---

**Votre serveur dédié OVH est prêt pour la production !** 🎉

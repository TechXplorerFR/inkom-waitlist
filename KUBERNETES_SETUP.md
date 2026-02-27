# 🚀 Scripts d'Installation Kubernetes

Deux options d'installation pour votre serveur dédié OVH.

## 📦 Deux scripts disponibles

### Option 1: K3s (Recommandé - Rapide et simple) ⭐

**Fichier:** `setup-k3s.sh`

**Avantages:**
- ✅ Installation en 5 minutes
- ✅ Très léger (parfait pour serveur unique)
- ✅ Tout inclus (réseau, storage, etc.)
- ✅ Production-ready
- ✅ Maintenu par Rancher/SUSE

```bash
# Sur votre serveur OVH
wget https://raw.githubusercontent.com/TechXplorerFR/inkom-waitlist/main/setup-k3s.sh
chmod +x setup-k3s.sh
sudo ./setup-k3s.sh
```

### Option 2: Kubeadm (Standard Kubernetes)

**Fichier:** `setup-kubernetes.sh`

**Avantages:**
- ✅ Kubernetes officiel complet
- ✅ Plus de contrôle sur la configuration
- ✅ Standard de l'industrie

```bash
# Sur votre serveur OVH
wget https://raw.githubusercontent.com/TechXplorerFR/inkom-waitlist/main/setup-kubernetes.sh
chmod +x setup-kubernetes.sh
sudo ./setup-kubernetes.sh
```

## 🎯 Que font ces scripts ?

Les deux scripts installent automatiquement :

1. **Kubernetes** (K3s ou kubeadm)
2. **Réseau CNI** (pour la communication entre pods)
3. **NGINX Ingress Controller** (Load Balancer HTTP/HTTPS)
4. **cert-manager** (Certificats SSL automatiques Let's Encrypt)
5. **Configuration firewall** (Ports 80, 443, 6443)

## 🚀 Utilisation

### 1. Sur votre serveur OVH (via SSH)

```bash
# Connexion SSH
ssh root@votre-ip-ovh

# Télécharger le script (K3s recommandé)
curl -sfL https://raw.githubusercontent.com/TechXplorerFR/inkom-waitlist/main/setup-k3s.sh -o setup-k3s.sh
chmod +x setup-k3s.sh

# Lancer l'installation
sudo ./setup-k3s.sh
```

Le script vous demandera :
- **IP publique** du serveur
- **Nom de domaine** (ex: inkom.ai)
- **Email** pour les certificats SSL

### 2. Récupérer le kubeconfig

```bash
# À la fin de l'installation, le script affiche la commande
# Exécutez-la pour obtenir le kubeconfig en base64
cat /etc/rancher/k3s/k3s.yaml | sed 's/127.0.0.1/VOTRE_IP/g' | base64 -w 0
```

### 3. Configurer GitHub

Dans votre repository GitHub :
1. **Settings** → **Secrets and variables** → **Actions**
2. Ajoutez le secret **KUBECONFIG** avec le base64 obtenu
3. Ajoutez les autres secrets (voir `.github/GITHUB_SECRETS_SETUP.md`)

### 4. Déployer

```bash
# Sur votre PC local
git tag v1.0.0
git push origin v1.0.0

# GitHub Actions déploie automatiquement !
```

## 📊 Comparaison

| Caractéristique | K3s | kubeadm |
|----------------|-----|---------|
| Taille | ~100 MB | ~500 MB |
| Installation | 5 min | 15 min |
| Complexité | Simple | Intermédiaire |
| RAM minimum | 512 MB | 2 GB |
| Recommandé pour | Serveur unique | Clusters multi-nodes |
| Production-ready | ✅ Oui | ✅ Oui |

## 🔍 Vérification post-installation

```bash
# Vérifier le cluster
kubectl get nodes

# Vérifier les pods
kubectl get pods --all-namespaces

# Vérifier l'Ingress Controller
kubectl get pods -n ingress-nginx

# Tester localement
curl -H "Host: inkom.ai" http://localhost
```

## 🌐 Configuration DNS

Après l'installation, configurez vos DNS chez OVH :

```
Type  | Nom    | Cible
------|--------|------------------
A     | @      | VOTRE_IP_OVH
A     | www    | VOTRE_IP_OVH
A     | api    | VOTRE_IP_OVH
```

## 🛠️ Composants installés

### 1. Kubernetes / K3s
Orchestrateur de conteneurs

### 2. NGINX Ingress Controller
**Rôle :** Load Balancer HTTP/HTTPS
- Reçoit le trafic sur ports 80/443
- Route vers les services selon le domaine
- Gère le SSL/TLS

**Configuration :** hostNetwork activé pour exposition directe

### 3. cert-manager
**Rôle :** Gestion automatique des certificats SSL
- Génère automatiquement les certificats Let's Encrypt
- Renouvelle automatiquement avant expiration
- Intégration avec l'Ingress

**ClusterIssuer :** letsencrypt-prod configuré

### 4. Réseau CNI
- **K3s :** Flannel (inclus)
- **kubeadm :** Calico (installé par le script)

Communication entre les pods dans le cluster

## ⚙️ Personnalisation

### Modifier le script K3s

```bash
# Ajouter des options à K3s
curl -sfL https://get.k3s.io | INSTALL_K3S_EXEC="
  --disable traefik
  --write-kubeconfig-mode 644
  --node-name mon-serveur
" sh -
```

### Modifier le script kubeadm

Les variables sont en début de script :
- Version Kubernetes
- CIDR du réseau pod
- Options d'initialisation

## 🆘 Troubleshooting

### Le script échoue

```bash
# Vérifier les logs
journalctl -u k3s -f                    # Pour K3s
journalctl -u kubelet -f                # Pour kubeadm

# Réinitialiser et recommencer
# K3s
/usr/local/bin/k3s-uninstall.sh
./setup-k3s.sh

# kubeadm
kubeadm reset -f
rm -rf /etc/kubernetes /var/lib/kubelet
./setup-kubernetes.sh
```

### L'Ingress ne fonctionne pas

Voir le guide complet : [k8s/TROUBLESHOOTING_NOT_ACCESSIBLE.md](k8s/TROUBLESHOOTING_NOT_ACCESSIBLE.md)

```bash
# Vérifier rapidement
kubectl get pods -n ingress-nginx
kubectl describe ingress
curl -H "Host: inkom.ai" http://localhost
```

## 📚 Documentation complète

- [Guide serveur dédié](k8s/DEDICATED_SERVER.md)
- [Workflow Docker/Kubernetes](k8s/DOCKER_KUBERNETES_WORKFLOW.md)
- [Troubleshooting](k8s/TROUBLESHOOTING_NOT_ACCESSIBLE.md)
- [Configuration secrets](k8s/SECRETS_AUTOMATION.md)

## 🔒 Sécurité

Les scripts configurent :
- ✅ Firewall UFW avec ports minimaux
- ✅ HTTPS automatique avec Let's Encrypt
- ✅ Accès API Kubernetes sécurisé
- ✅ Secrets Kubernetes pour données sensibles

## ⚡ Optimisations

### Pour serveur avec peu de RAM

Éditez les deployments après installation :

```bash
# Réduire les ressources
kubectl edit deployment frontend-deployment
# Changer resources.requests.memory: "64Mi"
# Changer resources.limits.memory: "128Mi"
```

### Pour serveur puissant

Augmentez le nombre de replicas :

```bash
kubectl scale deployment backend-deployment --replicas=3
kubectl scale deployment frontend-deployment --replicas=3
```

## ✅ Checklist post-installation

- [ ] Script exécuté sans erreur
- [ ] `kubectl get nodes` affiche le node en Ready
- [ ] `kubectl get pods -n ingress-nginx` affiche un pod Running
- [ ] `curl http://localhost` retourne une réponse
- [ ] DNS configurés sur OVH
- [ ] Kubeconfig ajouté dans GitHub Secrets
- [ ] Premier déploiement réussi

---

**🎉 Votre cluster Kubernetes est prêt pour la production !**

#!/bin/bash
#############################################################
# Script d'installation complète de Kubernetes avec kubeadm
# Pour serveur dédié (OVH, Hetzner, etc.)
# 
# Ce script installe :
# - kubeadm, kubelet, kubectl
# - containerd
# - Calico CNI (réseau)
# - NGINX Ingress Controller (load balancer)
# - cert-manager (SSL automatique)
#############################################################

set -e  # Arrêter en cas d'erreur

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}"
echo "╔═══════════════════════════════════════════════════════╗"
echo "║   Installation Kubernetes avec kubeadm                ║"
echo "║   Pour serveur dédié - Inkom Waitlist                 ║"
echo "╚═══════════════════════════════════════════════════════╝"
echo -e "${NC}"

# Vérifier les privilèges root
if [ "$EUID" -ne 0 ]; then 
    echo -e "${RED}❌ Ce script doit être exécuté en tant que root${NC}"
    echo "Utilisez: sudo ./setup-kubernetes.sh"
    exit 1
fi

echo -e "${YELLOW}⚙️  Configuration...${NC}"
read -p "Adresse IP publique de ce serveur: " SERVER_IP
read -p "Nom de domaine principal (ex: inkom.ai): " DOMAIN_NAME
read -p "Email pour les certificats SSL: " SSL_EMAIL

echo ""
echo -e "${GREEN}Configuration:${NC}"
echo "  IP: $SERVER_IP"
echo "  Domaine: $DOMAIN_NAME"
echo "  Email SSL: $SSL_EMAIL"
echo ""
read -p "Continuer? (y/N): " CONFIRM
if [[ ! $CONFIRM =~ ^[Yy]$ ]]; then
    echo "Installation annulée"
    exit 0
fi

#############################################################
# 1. PRÉPARATION DU SYSTÈME
#############################################################

echo ""
echo -e "${BLUE}═══ 1/7 Préparation du système ${NC}"

# Désactiver le swap (requis par Kubernetes)
echo -e "${YELLOW}Désactivation du swap...${NC}"
swapoff -a
sed -i '/ swap / s/^\(.*\)$/#\1/g' /etc/fstab

# Charger les modules kernel nécessaires
echo -e "${YELLOW}Configuration des modules kernel...${NC}"
cat <<EOF | tee /etc/modules-load.d/k8s.conf
overlay
br_netfilter
EOF

modprobe overlay
modprobe br_netfilter

# Configuration sysctl pour Kubernetes
cat <<EOF | tee /etc/sysctl.d/k8s.conf
net.bridge.bridge-nf-call-iptables  = 1
net.bridge.bridge-nf-call-ip6tables = 1
net.ipv4.ip_forward                 = 1
EOF

sysctl --system

echo -e "${GREEN}✅ Système préparé${NC}"

#############################################################
# 2. INSTALLATION DE CONTAINERD
#############################################################

echo ""
echo -e "${BLUE}═══ 2/7 Installation de containerd ${NC}"

# Mettre à jour les paquets
apt-get update
apt-get install -y apt-transport-https ca-certificates curl software-properties-common

# Installer containerd
apt-get install -y containerd

# Configurer containerd
mkdir -p /etc/containerd
containerd config default | tee /etc/containerd/config.toml

# Activer systemd cgroup driver
sed -i 's/SystemdCgroup = false/SystemdCgroup = true/' /etc/containerd/config.toml

# Redémarrer containerd
systemctl restart containerd
systemctl enable containerd

echo -e "${GREEN}✅ Containerd installé${NC}"

#############################################################
# 3. INSTALLATION DE KUBEADM, KUBELET, KUBECTL
#############################################################

echo ""
echo -e "${BLUE}═══ 3/7 Installation de kubeadm, kubelet, kubectl ${NC}"

# Ajouter la clé GPG de Kubernetes
curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.28/deb/Release.key | gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg

# Ajouter le dépôt Kubernetes
echo 'deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v1.28/deb/ /' | tee /etc/apt/sources.list.d/kubernetes.list

# Installer les paquets
apt-get update
apt-get install -y kubelet kubeadm kubectl
apt-mark hold kubelet kubeadm kubectl

echo -e "${GREEN}✅ Kubernetes installé${NC}"

#############################################################
# 4. INITIALISATION DU CLUSTER
#############################################################

echo ""
echo -e "${BLUE}═══ 4/7 Initialisation du cluster Kubernetes ${NC}"

# Initialiser le cluster
kubeadm init --pod-network-cidr=192.168.0.0/16 --apiserver-advertise-address=$SERVER_IP

# Configurer kubectl pour l'utilisateur courant
export KUBECONFIG=/etc/kubernetes/admin.conf
mkdir -p $HOME/.kube
cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
chown $(id -u):$(id -g) $HOME/.kube/config

# Permettre de scheduler des pods sur le master (serveur unique)
kubectl taint nodes --all node-role.kubernetes.io/control-plane-

echo -e "${GREEN}✅ Cluster initialisé${NC}"

#############################################################
# 5. INSTALLATION DU RÉSEAU (CALICO CNI)
#############################################################

echo ""
echo -e "${BLUE}═══ 5/7 Installation du réseau Calico ${NC}"

# Installer Calico
kubectl create -f https://raw.githubusercontent.com/projectcalico/calico/v3.26.1/manifests/tigera-operator.yaml
kubectl create -f https://raw.githubusercontent.com/projectcalico/calico/v3.26.1/manifests/custom-resources.yaml

echo -e "${YELLOW}Attente du démarrage du réseau (30s)...${NC}"
sleep 30

echo -e "${GREEN}✅ Réseau installé${NC}"

#############################################################
# 6. INSTALLATION DE NGINX INGRESS CONTROLLER (LOAD BALANCER)
#############################################################

echo ""
echo -e "${BLUE}═══ 6/7 Installation du Load Balancer (NGINX Ingress) ${NC}"

# Installer NGINX Ingress Controller
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.1/deploy/static/provider/baremetal/deploy.yaml

# Attendre que le namespace soit créé
sleep 5

# Configurer avec hostNetwork pour exposer sur ports 80/443
kubectl patch deployment ingress-nginx-controller -n ingress-nginx --type='json' \
  -p='[{"op": "add", "path": "/spec/template/spec/hostNetwork", "value": true}]'

kubectl patch deployment ingress-nginx-controller -n ingress-nginx --type='json' \
  -p='[{"op": "replace", "path": "/spec/template/spec/dnsPolicy", "value": "ClusterFirstWithHostNet"}]'

echo -e "${YELLOW}Attente du démarrage de l'Ingress Controller...${NC}"
kubectl wait --namespace ingress-nginx \
  --for=condition=ready pod \
  --selector=app.kubernetes.io/component=controller \
  --timeout=120s

echo -e "${GREEN}✅ Load Balancer installé${NC}"

#############################################################
# 7. INSTALLATION DE CERT-MANAGER (SSL AUTOMATIQUE)
#############################################################

echo ""
echo -e "${BLUE}═══ 7/7 Installation de cert-manager (SSL) ${NC}"

# Installer cert-manager
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.13.0/cert-manager.yaml

echo -e "${YELLOW}Attente du démarrage de cert-manager (30s)...${NC}"
sleep 30

# Créer le ClusterIssuer Let's Encrypt
cat <<EOF | kubectl apply -f -
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    server: https://acme-v02.api.letsencrypt.org/directory
    email: $SSL_EMAIL
    privateKeySecretRef:
      name: letsencrypt-prod
    solvers:
    - http01:
        ingress:
          class: nginx
EOF

echo -e "${GREEN}✅ cert-manager installé${NC}"

#############################################################
# 8. CONFIGURATION DU FIREWALL
#############################################################

echo ""
echo -e "${BLUE}═══ Configuration du firewall ${NC}"

if command -v ufw &> /dev/null; then
    echo -e "${YELLOW}Configuration UFW...${NC}"
    ufw allow 22/tcp    # SSH
    ufw allow 80/tcp    # HTTP
    ufw allow 443/tcp   # HTTPS
    ufw allow 6443/tcp  # Kubernetes API
    ufw --force enable
    echo -e "${GREEN}✅ Firewall configuré${NC}"
else
    echo -e "${YELLOW}⚠️  UFW non installé - configurez votre firewall manuellement${NC}"
fi

#############################################################
# 9. VÉRIFICATION ET RÉSUMÉ
#############################################################

echo ""
echo -e "${BLUE}═══ Vérification de l'installation ${NC}"

echo ""
echo "Nodes:"
kubectl get nodes

echo ""
echo "Pods système:"
kubectl get pods --all-namespaces

echo ""
echo "Services:"
kubectl get svc --all-namespaces

echo ""
echo -e "${BLUE}═══════════════════════════════════════════════════════╗"
echo "║   ✅ Installation terminée avec succès !              ║"
echo "╚═══════════════════════════════════════════════════════╝${NC}"

echo ""
echo -e "${GREEN}📋 Récapitulatif:${NC}"
echo "  ✅ Kubernetes installé"
echo "  ✅ Réseau Calico configuré"
echo "  ✅ Load Balancer NGINX Ingress opérationnel (ports 80/443)"
echo "  ✅ cert-manager installé (SSL automatique)"
echo "  ✅ Firewall configuré"
echo ""

echo -e "${YELLOW}📝 Configuration kubeconfig pour accès distant:${NC}"
echo "  1. Récupérez le kubeconfig:"
echo "     cat ~/.kube/config | sed 's/127.0.0.1/$SERVER_IP/g' | base64 -w 0"
echo ""
echo "  2. Ajoutez-le comme secret GitHub (KUBECONFIG)"
echo ""

echo -e "${YELLOW}🌐 Configuration DNS:${NC}"
echo "  Pointez vos domaines vers cette IP: ${GREEN}$SERVER_IP${NC}"
echo "  - $DOMAIN_NAME          A  $SERVER_IP"
echo "  - api.$DOMAIN_NAME      A  $SERVER_IP"
echo "  - www.$DOMAIN_NAME      A  $SERVER_IP"
echo ""

echo -e "${YELLOW}🚀 Prochaines étapes:${NC}"
echo "  1. Configurez vos secrets GitHub"
echo "  2. Lancez le déploiement: git tag v1.0.0 && git push origin v1.0.0"
echo "  3. GitHub Actions déploiera automatiquement votre application"
echo ""

echo -e "${BLUE}📚 Commandes utiles:${NC}"
echo "  kubectl get nodes                    # Status du cluster"
echo "  kubectl get pods --all-namespaces    # Tous les pods"
echo "  kubectl get ingress                  # Vérifier l'ingress"
echo "  kubectl logs -n ingress-nginx -l app.kubernetes.io/component=controller  # Logs Ingress"
echo ""

echo -e "${GREEN}🎉 Votre serveur est prêt pour la production !${NC}"
echo ""

echo -e "${GREEN}ℹ️  Informations sauvegardées dans: /root/kubernetes-info.txt${NC}"
echo ""

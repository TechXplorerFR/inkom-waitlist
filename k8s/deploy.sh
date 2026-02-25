#!/bin/bash
# Script de déploiement rapide pour Inkom Waitlist

set -e

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Déploiement Inkom Waitlist${NC}"
echo ""

# Vérifier les prérequis
echo -e "${YELLOW}📋 Vérification des prérequis...${NC}"
command -v kubectl >/dev/null 2>&1 || { echo -e "${RED}❌ kubectl n'est pas installé${NC}"; exit 1; }
command -v docker >/dev/null 2>&1 || { echo -e "${RED}❌ docker n'est pas installé${NC}"; exit 1; }
echo -e "${GREEN}✓ Prérequis OK${NC}"
echo ""

# Variables
read -p "Nom de votre registre Docker (ex: docker.io/username): " REGISTRY
read -p "Version de l'image (ex: latest, v1.0.0): " VERSION

# Build et push frontend
echo -e "${YELLOW}🏗️  Build frontend...${NC}"
cd src/frontend
docker build -t ${REGISTRY}/inkom-frontend:${VERSION} .
echo -e "${YELLOW}📤 Push frontend...${NC}"
docker push ${REGISTRY}/inkom-frontend:${VERSION}
cd ../..

# Build et push backend
echo -e "${YELLOW}🏗️  Build backend...${NC}"
cd src/backend
docker build -t ${REGISTRY}/inkom-backend:${VERSION} .
echo -e "${YELLOW}📤 Push backend...${NC}"
docker push ${REGISTRY}/inkom-backend:${VERSION}
cd ../..

# Mettre à jour les manifests
echo -e "${YELLOW}📝 Mise à jour des manifests...${NC}"
sed -i.bak "s|YOUR_REGISTRY/inkom-frontend:latest|${REGISTRY}/inkom-frontend:${VERSION}|g" k8s/frontend-deployment.yaml
sed -i.bak "s|YOUR_REGISTRY/inkom-backend:latest|${REGISTRY}/inkom-backend:${VERSION}|g" k8s/backend-deployment.yaml

# Déployer sur Kubernetes
echo -e "${YELLOW}🚢 Déploiement sur Kubernetes...${NC}"
kubectl apply -f k8s/

# Attendre que les pods soient prêts
echo -e "${YELLOW}⏳ Attente du démarrage des pods...${NC}"
kubectl wait --for=condition=ready pod -l app=inkom-frontend --timeout=300s
kubectl wait --for=condition=ready pod -l app=inkom-backend --timeout=300s

# Afficher le status
echo ""
echo -e "${GREEN}✅ Déploiement terminé !${NC}"
echo ""
echo "📊 Status:"
kubectl get pods -l 'app in (inkom-frontend,inkom-backend)'
echo ""
echo "🌐 Ingress:"
kubectl get ingress inkom-ingress
echo ""
echo -e "${GREEN}🎉 Application accessible sur https://inkom.ai${NC}"

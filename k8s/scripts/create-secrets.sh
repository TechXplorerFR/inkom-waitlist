#!/bin/bash
# Script de création sécurisée des secrets Kubernetes
# Usage: ./create-secrets.sh

set -e

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🔐 Création sécurisée des secrets Kubernetes${NC}"
echo ""

# Vérifier kubectl
if ! command -v kubectl &> /dev/null; then
    echo -e "${RED}❌ kubectl n'est pas installé${NC}"
    exit 1
fi

# Vérifier la connexion au cluster
echo -e "${YELLOW}📡 Vérification de la connexion au cluster...${NC}"
if ! kubectl cluster-info &> /dev/null; then
    echo -e "${RED}❌ Impossible de se connecter au cluster Kubernetes${NC}"
    echo "Vérifiez votre configuration kubectl"
    exit 1
fi
echo -e "${GREEN}✅ Connecté au cluster${NC}"
echo ""

# Demander le namespace
read -p "Namespace (default): " NAMESPACE
NAMESPACE=${NAMESPACE:-default}

# Vérifier si le secret existe déjà
if kubectl get secret backend-secrets -n $NAMESPACE &> /dev/null; then
    echo -e "${YELLOW}⚠️  Le secret 'backend-secrets' existe déjà dans le namespace '$NAMESPACE'${NC}"
    read -p "Voulez-vous le supprimer et le recréer? (y/N): " CONFIRM
    if [[ $CONFIRM =~ ^[Yy]$ ]]; then
        kubectl delete secret backend-secrets -n $NAMESPACE
        echo -e "${GREEN}✅ Secret supprimé${NC}"
    else
        echo "Annulé"
        exit 0
    fi
fi

echo ""
echo -e "${BLUE}📝 Entrez les valeurs des secrets${NC}"
echo -e "${YELLOW}(Les valeurs ne seront pas affichées)${NC}"
echo ""

# Demander les secrets de manière sécurisée
echo -n "DATABASE_URL: "
read -s DATABASE_URL
echo ""

echo -n "MAILGUN_API_KEY: "
read -s MAILGUN_API_KEY
echo ""

echo -n "MAILGUN_DOMAIN: "
read MAILGUN_DOMAIN

echo ""

# Validation
if [ -z "$DATABASE_URL" ] || [ -z "$MAILGUN_API_KEY" ] || [ -z "$MAILGUN_DOMAIN" ]; then
    echo -e "${RED}❌ Toutes les valeurs sont requises${NC}"
    exit 1
fi

# Créer le secret
echo -e "${YELLOW}🔧 Création du secret...${NC}"

kubectl create secret generic backend-secrets \
  -n $NAMESPACE \
  --from-literal=database-url="$DATABASE_URL" \
  --from-literal=mailgun-api-key="$MAILGUN_API_KEY" \
  --from-literal=mailgun-domain="$MAILGUN_DOMAIN"

# Nettoyer les variables
unset DATABASE_URL
unset MAILGUN_API_KEY
unset MAILGUN_DOMAIN

echo ""
echo -e "${GREEN}✅ Secret créé avec succès dans le namespace '$NAMESPACE'${NC}"
echo ""

# Vérifier
echo -e "${BLUE}📊 Vérification:${NC}"
kubectl get secret backend-secrets -n $NAMESPACE

echo ""
echo -e "${YELLOW}💡 Conseil: Redémarrez vos deployments pour charger les nouveaux secrets${NC}"
echo -e "   ${BLUE}kubectl rollout restart deployment/backend-deployment -n $NAMESPACE${NC}"
echo ""

#!/bin/bash
# Script pour vérifier et déboguer les secrets Kubernetes
# Usage: ./debug-secrets.sh [namespace]

NAMESPACE=${1:-default}

echo "🔍 Diagnostic des secrets Kubernetes"
echo "Namespace: $NAMESPACE"
echo ""

# Vérifier la connexion
echo "📡 Connexion au cluster..."
if ! kubectl cluster-info &> /dev/null; then
    echo "❌ Impossible de se connecter au cluster"
    exit 1
fi
echo "✅ Connecté"
echo ""

# Lister les secrets
echo "📋 Secrets disponibles dans le namespace '$NAMESPACE':"
kubectl get secrets -n $NAMESPACE
echo ""

# Vérifier backend-secrets
if kubectl get secret backend-secrets -n $NAMESPACE &> /dev/null; then
    echo "✅ Le secret 'backend-secrets' existe"
    echo ""
    
    echo "📝 Clés dans le secret:"
    kubectl get secret backend-secrets -n $NAMESPACE -o jsonpath='{.data}' | jq -r 'keys[]'
    echo ""
    
    echo "🔓 Valeurs décodées (ATTENTION: sensible!):"
    read -p "Afficher les valeurs? (y/N): " CONFIRM
    if [[ $CONFIRM =~ ^[Yy]$ ]]; then
        echo ""
        kubectl get secret backend-secrets -n $NAMESPACE -o json | jq '.data | map_values(@base64d)'
    fi
else
    echo "❌ Le secret 'backend-secrets' n'existe pas"
    echo ""
    echo "💡 Pour le créer:"
    echo "   ./create-secrets.sh"
fi
echo ""

# Vérifier les pods qui utilisent le secret
echo "🔍 Pods utilisant le secret 'backend-secrets':"
kubectl get pods -n $NAMESPACE -o json | \
    jq -r '.items[] | select(.spec.containers[].envFrom[]?.secretRef.name == "backend-secrets") | .metadata.name'
echo ""

# Vérifier les variables d'environnement dans un pod backend
BACKEND_POD=$(kubectl get pods -n $NAMESPACE -l app=inkom-backend -o jsonpath='{.items[0].metadata.name}' 2>/dev/null)
if [ ! -z "$BACKEND_POD" ]; then
    echo "🔧 Variables d'environnement du pod backend '$BACKEND_POD':"
    echo ""
    
    echo "DATABASE_URL présent:"
    kubectl exec -n $NAMESPACE $BACKEND_POD -- sh -c 'echo ${DATABASE_URL:+✅ Défini}${DATABASE_URL:-❌ Non défini}' 2>/dev/null || echo "❌ Erreur"
    
    echo "MAILGUN_API_KEY présent:"
    kubectl exec -n $NAMESPACE $BACKEND_POD -- sh -c 'echo ${MAILGUN_API_KEY:+✅ Défini}${MAILGUN_API_KEY:-❌ Non défini}' 2>/dev/null || echo "❌ Erreur"
    
    echo "MAILGUN_DOMAIN présent:"
    kubectl exec -n $NAMESPACE $BACKEND_POD -- sh -c 'echo ${MAILGUN_DOMAIN:+✅ Défini}${MAILGUN_DOMAIN:-❌ Non défini}' 2>/dev/null || echo "❌ Erreur"
else
    echo "⚠️  Aucun pod backend trouvé"
fi
echo ""

echo "✅ Diagnostic terminé"

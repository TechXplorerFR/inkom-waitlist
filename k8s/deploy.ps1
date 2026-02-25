# PowerShell script de déploiement rapide pour Inkom Waitlist

Write-Host "🚀 Déploiement Inkom Waitlist" -ForegroundColor Green
Write-Host ""

# Vérifier les prérequis
Write-Host "📋 Vérification des prérequis..." -ForegroundColor Yellow
if (-not (Get-Command kubectl -ErrorAction SilentlyContinue)) {
    Write-Host "❌ kubectl n'est pas installé" -ForegroundColor Red
    exit 1
}
if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
    Write-Host "❌ docker n'est pas installé" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Prérequis OK" -ForegroundColor Green
Write-Host ""

# Variables
$REGISTRY = Read-Host "Nom de votre registre Docker (ex: docker.io/username)"
$VERSION = Read-Host "Version de l'image (ex: latest, v1.0.0)"

# Build et push frontend
Write-Host "🏗️  Build frontend..." -ForegroundColor Yellow
Set-Location src/frontend
docker build -t "${REGISTRY}/inkom-frontend:${VERSION}" .
Write-Host "📤 Push frontend..." -ForegroundColor Yellow
docker push "${REGISTRY}/inkom-frontend:${VERSION}"
Set-Location ../..

# Build et push backend
Write-Host "🏗️  Build backend..." -ForegroundColor Yellow
Set-Location src/backend
docker build -t "${REGISTRY}/inkom-backend:${VERSION}" .
Write-Host "📤 Push backend..." -ForegroundColor Yellow
docker push "${REGISTRY}/inkom-backend:${VERSION}"
Set-Location ../..

# Mettre à jour les manifests
Write-Host "📝 Mise à jour des manifests..." -ForegroundColor Yellow
(Get-Content k8s/frontend-deployment.yaml) -replace 'YOUR_REGISTRY/inkom-frontend:latest', "${REGISTRY}/inkom-frontend:${VERSION}" | Set-Content k8s/frontend-deployment.yaml
(Get-Content k8s/backend-deployment.yaml) -replace 'YOUR_REGISTRY/inkom-backend:latest', "${REGISTRY}/inkom-backend:${VERSION}" | Set-Content k8s/backend-deployment.yaml

# Déployer sur Kubernetes
Write-Host "🚢 Déploiement sur Kubernetes..." -ForegroundColor Yellow
kubectl apply -f k8s/

# Attendre que les pods soient prêts
Write-Host "⏳ Attente du démarrage des pods..." -ForegroundColor Yellow
kubectl wait --for=condition=ready pod -l app=inkom-frontend --timeout=300s
kubectl wait --for=condition=ready pod -l app=inkom-backend --timeout=300s

# Afficher le status
Write-Host ""
Write-Host "✅ Déploiement terminé !" -ForegroundColor Green
Write-Host ""
Write-Host "📊 Status:"
kubectl get pods -l 'app in (inkom-frontend,inkom-backend)'
Write-Host ""
Write-Host "🌐 Ingress:"
kubectl get ingress inkom-ingress
Write-Host ""
Write-Host "🎉 Application accessible sur https://inkom.ai" -ForegroundColor Green

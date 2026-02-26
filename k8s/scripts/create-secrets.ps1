# Script PowerShell de création sécurisée des secrets Kubernetes
# Usage: .\create-secrets.ps1

Write-Host "🔐 Création sécurisée des secrets Kubernetes" -ForegroundColor Blue
Write-Host ""

# Vérifier kubectl
if (-not (Get-Command kubectl -ErrorAction SilentlyContinue)) {
    Write-Host "❌ kubectl n'est pas installé" -ForegroundColor Red
    exit 1
}

# Vérifier la connexion au cluster
Write-Host "📡 Vérification de la connexion au cluster..." -ForegroundColor Yellow
try {
    kubectl cluster-info 2>&1 | Out-Null
    if ($LASTEXITCODE -ne 0) { throw }
    Write-Host "✅ Connecté au cluster" -ForegroundColor Green
} catch {
    Write-Host "❌ Impossible de se connecter au cluster Kubernetes" -ForegroundColor Red
    Write-Host "Vérifiez votre configuration kubectl"
    exit 1
}
Write-Host ""

# Demander le namespace
$Namespace = Read-Host "Namespace (default)"
if ([string]::IsNullOrWhiteSpace($Namespace)) {
    $Namespace = "default"
}

# Vérifier si le secret existe déjà
$secretExists = kubectl get secret backend-secrets -n $Namespace 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "⚠️  Le secret 'backend-secrets' existe déjà dans le namespace '$Namespace'" -ForegroundColor Yellow
    $Confirm = Read-Host "Voulez-vous le supprimer et le recréer? (y/N)"
    if ($Confirm -eq 'y' -or $Confirm -eq 'Y') {
        kubectl delete secret backend-secrets -n $Namespace
        Write-Host "✅ Secret supprimé" -ForegroundColor Green
    } else {
        Write-Host "Annulé"
        exit 0
    }
}

Write-Host ""
Write-Host "📝 Entrez les valeurs des secrets" -ForegroundColor Blue
Write-Host "(Les valeurs ne seront pas affichées)" -ForegroundColor Yellow
Write-Host ""

# Demander les secrets de manière sécurisée
$DATABASE_URL = Read-Host "DATABASE_URL" -AsSecureString
$MAILGUN_API_KEY = Read-Host "MAILGUN_API_KEY" -AsSecureString
$MAILGUN_DOMAIN = Read-Host "MAILGUN_DOMAIN"

Write-Host ""

# Convertir SecureString en texte clair pour kubectl
$DATABASE_URL_Plain = [Runtime.InteropServices.Marshal]::PtrToStringAuto(
    [Runtime.InteropServices.Marshal]::SecureStringToBSTR($DATABASE_URL)
)
$MAILGUN_API_KEY_Plain = [Runtime.InteropServices.Marshal]::PtrToStringAuto(
    [Runtime.InteropServices.Marshal]::SecureStringToBSTR($MAILGUN_API_KEY)
)

# Validation
if ([string]::IsNullOrWhiteSpace($DATABASE_URL_Plain) -or 
    [string]::IsNullOrWhiteSpace($MAILGUN_API_KEY_Plain) -or 
    [string]::IsNullOrWhiteSpace($MAILGUN_DOMAIN)) {
    Write-Host "❌ Toutes les valeurs sont requises" -ForegroundColor Red
    exit 1
}

# Créer le secret
Write-Host "🔧 Création du secret..." -ForegroundColor Yellow

kubectl create secret generic backend-secrets `
  -n $Namespace `
  --from-literal=database-url="$DATABASE_URL_Plain" `
  --from-literal=mailgun-api-key="$MAILGUN_API_KEY_Plain" `
  --from-literal=mailgun-domain="$MAILGUN_DOMAIN"

# Nettoyer les variables
Remove-Variable DATABASE_URL_Plain
Remove-Variable MAILGUN_API_KEY_Plain
Remove-Variable DATABASE_URL
Remove-Variable MAILGUN_API_KEY

Write-Host ""
Write-Host "✅ Secret créé avec succès dans le namespace '$Namespace'" -ForegroundColor Green
Write-Host ""

# Vérifier
Write-Host "📊 Vérification:" -ForegroundColor Blue
kubectl get secret backend-secrets -n $Namespace

Write-Host ""
Write-Host "💡 Conseil: Redémarrez vos deployments pour charger les nouveaux secrets" -ForegroundColor Yellow
Write-Host "   kubectl rollout restart deployment/backend-deployment -n $Namespace" -ForegroundColor Blue
Write-Host ""

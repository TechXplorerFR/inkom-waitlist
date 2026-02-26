# Script PowerShell pour vérifier et déboguer les secrets Kubernetes
# Usage: .\debug-secrets.ps1 [namespace]

param(
    [string]$Namespace = "default"
)

Write-Host "🔍 Diagnostic des secrets Kubernetes" -ForegroundColor Blue
Write-Host "Namespace: $Namespace"
Write-Host ""

# Vérifier la connexion
Write-Host "📡 Connexion au cluster..." -ForegroundColor Yellow
try {
    kubectl cluster-info 2>&1 | Out-Null
    if ($LASTEXITCODE -ne 0) { throw }
    Write-Host "✅ Connecté" -ForegroundColor Green
} catch {
    Write-Host "❌ Impossible de se connecter au cluster" -ForegroundColor Red
    exit 1
}
Write-Host ""

# Lister les secrets
Write-Host "📋 Secrets disponibles dans le namespace '$Namespace':" -ForegroundColor Cyan
kubectl get secrets -n $Namespace
Write-Host ""

# Vérifier backend-secrets
$secretExists = kubectl get secret backend-secrets -n $Namespace 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Le secret 'backend-secrets' existe" -ForegroundColor Green
    Write-Host ""
    
    Write-Host "📝 Clés dans le secret:" -ForegroundColor Cyan
    $keys = kubectl get secret backend-secrets -n $Namespace -o jsonpath='{.data}' | ConvertFrom-Json
    $keys.PSObject.Properties.Name
    Write-Host ""
    
    Write-Host "🔓 Valeurs décodées (ATTENTION: sensible!):" -ForegroundColor Yellow
    $Confirm = Read-Host "Afficher les valeurs? (y/N)"
    if ($Confirm -eq 'y' -or $Confirm -eq 'Y') {
        Write-Host ""
        $secretData = kubectl get secret backend-secrets -n $Namespace -o json | ConvertFrom-Json
        foreach ($key in $secretData.data.PSObject.Properties) {
            $value = [System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String($key.Value))
            Write-Host "$($key.Name): $value"
        }
    }
} else {
    Write-Host "❌ Le secret 'backend-secrets' n'existe pas" -ForegroundColor Red
    Write-Host ""
    Write-Host "💡 Pour le créer:" -ForegroundColor Yellow
    Write-Host "   .\create-secrets.ps1"
}
Write-Host ""

# Vérifier les pods qui utilisent le secret
Write-Host "🔍 Pods utilisant le secret 'backend-secrets':" -ForegroundColor Cyan
$pods = kubectl get pods -n $Namespace -o json | ConvertFrom-Json
foreach ($pod in $pods.items) {
    foreach ($container in $pod.spec.containers) {
        if ($container.envFrom.secretRef.name -contains "backend-secrets") {
            Write-Host $pod.metadata.name
        }
    }
}
Write-Host ""

# Vérifier les variables d'environnement dans un pod backend
$backendPod = kubectl get pods -n $Namespace -l app=inkom-backend -o jsonpath='{.items[0].metadata.name}' 2>$null
if ($backendPod) {
    Write-Host "🔧 Variables d'environnement du pod backend '$backendPod':" -ForegroundColor Cyan
    Write-Host ""
    
    Write-Host -NoNewline "DATABASE_URL présent: "
    kubectl exec -n $Namespace $backendPod -- sh -c 'echo ${DATABASE_URL:+✅ Défini}${DATABASE_URL:-❌ Non défini}' 2>$null
    
    Write-Host -NoNewline "MAILGUN_API_KEY présent: "
    kubectl exec -n $Namespace $backendPod -- sh -c 'echo ${MAILGUN_API_KEY:+✅ Défini}${MAILGUN_API_KEY:-❌ Non défini}' 2>$null
    
    Write-Host -NoNewline "MAILGUN_DOMAIN présent: "
    kubectl exec -n $Namespace $backendPod -- sh -c 'echo ${MAILGUN_DOMAIN:+✅ Défini}${MAILGUN_DOMAIN:-❌ Non défini}' 2>$null
} else {
    Write-Host "⚠️  Aucun pod backend trouvé" -ForegroundColor Yellow
}
Write-Host ""

Write-Host "✅ Diagnostic terminé" -ForegroundColor Green

# Variables (remplace par ton username Docker Hub)
$imageName = "<ton-username>/mon-image:latest"
$deploymentName = "mon-appli"

Write-Host "Construction de l'image Docker..."
docker build -t $imageName .

Write-Host "Redémarrage du déploiement Kubernetes..."
kubectl rollout restart deployment $deploymentName

Start-Sleep -Seconds 5

Write-Host "Pods en cours..."
kubectl get pods

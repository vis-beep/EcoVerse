$targetDir = "C:\Users\BARANIDHARAN K\AppData\Local\Programs\node"
if (-not (Test-Path $targetDir)) { 
    New-Item -ItemType Directory -Path $targetDir -Force | Out-Null 
}
$zipPath = "$env:TEMP\node.zip"
Write-Host "Downloading portable Node.js 20.18.0..."
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
Invoke-WebRequest -Uri "https://nodejs.org/dist/v20.18.0/node-v20.18.0-win-x64.zip" -OutFile $zipPath
Write-Host "Extracting Node.js..."
$extractPath = "$env:TEMP\node_temp"
if (Test-Path $extractPath) { Remove-Item -Path $extractPath -Recurse -Force }
Expand-Archive -Path $zipPath -DestinationPath $extractPath -Force
Copy-Item -Path "$extractPath\node-v20.18.0-win-x64\*" -Destination $targetDir -Recurse -Force
Remove-Item -Path $zipPath -Force
Remove-Item -Path $extractPath -Recurse -Force
[Environment]::SetEnvironmentVariable("PATH", "$targetDir;" + [Environment]::GetEnvironmentVariable("PATH", "User"), "User")
Write-Host "Node.js successfully set up at $targetDir"
& "$targetDir\node.exe" -v
& "$targetDir\npm.cmd" -v

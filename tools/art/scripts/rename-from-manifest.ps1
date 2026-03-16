param(
  [string]$ManifestPath = "C:\Users\cui\Workspaces\I-love-playing-ball\tools\art\exports\manifest.sample.json",
  [switch]$CopyOnly
)

$ErrorActionPreference = "Stop"

if (-not (Test-Path $ManifestPath)) {
  throw "Manifest not found: $ManifestPath"
}

$manifestDirectory = Split-Path -Parent $ManifestPath
$artRoot = Split-Path -Parent $manifestDirectory
$manifest = Get-Content $ManifestPath -Raw | ConvertFrom-Json

foreach ($item in $manifest.items) {
  $sourcePath = Join-Path $artRoot $item.source
  $targetPath = Join-Path $artRoot $item.target
  $targetDirectory = Split-Path -Parent $targetPath

  if (-not (Test-Path $sourcePath)) {
    Write-Warning "Missing source: $sourcePath"
    continue
  }

  if (-not (Test-Path $targetDirectory)) {
    New-Item -ItemType Directory -Path $targetDirectory | Out-Null
  }

  Copy-Item -Path $sourcePath -Destination $targetPath -Force

  if (-not $CopyOnly) {
    Write-Host "Prepared $($item.target) [$($item.category)]"
  }
}

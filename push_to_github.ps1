$gh = "C:\Users\Asus\.gemini\antigravity\scratch\gh\bin\gh.exe"
$git = "C:\Users\Asus\.gemini\antigravity\scratch\mingit\cmd\git.exe"
$repoDir = "C:\Users\Asus\.gemini\antigravity\scratch\WebSite-Premium"

Set-Location $repoDir

Write-Host "========================================================" -ForegroundColor Cyan
Write-Host " GITHUB ONE-CLICK AUTHORIZATION & DEPLOYMENT" -ForegroundColor Green
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Logging into GitHub via your browser..." -ForegroundColor Yellow

& $gh auth login --web -h github.com -p https -s repo

Write-Host ""
Write-Host "Configuring Git credentials..." -ForegroundColor Yellow
& $gh auth setup-git

Write-Host ""
Write-Host "Pushing code to https://github.com/dhruvmishradev/masterwebsite- ..." -ForegroundColor Green
& $git push -u origin main --force

Write-Host ""
Write-Host "========================================================" -ForegroundColor Green
Write-Host " SUCCESS! Code has been uploaded to GitHub." -ForegroundColor Green
Write-Host " Visit: https://github.com/dhruvmishradev/masterwebsite-" -ForegroundColor Cyan
Write-Host "========================================================" -ForegroundColor Green
Write-Host "Press any key to close this window..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

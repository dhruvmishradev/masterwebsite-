@echo off
title Dhruv Mishra Portfolio - Web Server
cd /d "%~dp0"
echo ========================================================
echo Starting Dhruv Mishra Portfolio on http://localhost:3000
echo ========================================================
start "" "http://localhost:3000"
python -m http.server 3000
pause

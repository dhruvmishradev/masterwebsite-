@echo off
chcp 65001 >nul
title Dhruv Mishra Portfolio - Project Command Center
color 0b

:MENU
cls
echo ===============================================================================
echo                DHRUV MISHRA PORTFOLIO - PROJECT COMMAND CENTER
echo ===============================================================================
echo.
echo  [FILE LOCATION ON YOUR PC]
echo  - All your website code is located here:
echo    --^> C:\Project\WebSite\
echo.
echo  [WHAT EACH FILE IS]
echo  * index.html       : Complete production website (Hero, Photo, About Me,
echo                       Core Skills, LinkedIn Certifications, Real Projects)
echo  * profile.jpg      : Your portrait photo displayed on the site
echo  * run.bat          : Instant 1-click local web server launcher
echo  * src\             : Complete Next.js / TypeScript source code structure
echo  * README.md        : Project documentation
echo.
echo ===============================================================================
echo  [ACTIONS AVAILABLE]
echo ===============================================================================
echo.
echo   [1]  RUN WEBSITE LOCALLY  (Opens http://localhost:3000 in your browser)
echo   [2]  OPEN FOLDER IN EXPLORER  (See all files on your computer)
echo   [3]  EDIT WEBSITE CODE (Opens index.html in Notepad)
echo   [4]  PUSH TO GITHUB (https://github.com/dhruvmishradev/masterwebsite-)
echo   [5]  HELP / WHERE IS EVERYTHING?
echo   [6]  EXIT
echo.
set /p choice="Enter choice [1-6]: "

if "%choice%"=="1" goto RUN_LOCAL
if "%choice%"=="2" goto OPEN_EXPLORER
if "%choice%"=="3" goto EDIT_CODE
if "%choice%"=="4" goto PUSH_GITHUB
if "%choice%"=="5" goto EXPLAIN_ALL
if "%choice%"=="6" goto EXIT_PROMPT
goto MENU

:RUN_LOCAL
cls
echo Starting local web server on http://localhost:3000 ...
start "" "http://localhost:3000"
python -m http.server 3000 --directory "C:\Project\WebSite"
goto MENU

:OPEN_EXPLORER
explorer.exe "C:\Project\WebSite"
goto MENU

:EDIT_CODE
notepad.exe "C:\Project\WebSite\index.html"
goto MENU

:PUSH_GITHUB
cls
echo ===============================================================================
echo                PUSHING CODE TO GITHUB REPOSITORY
echo                https://github.com/dhruvmishradev/masterwebsite-
echo ===============================================================================
echo.
echo If GitHub asks for authorization, follow the prompt in your browser.
echo.
"C:\Users\Asus\.gemini\antigravity\scratch\mingit\cmd\git.exe" --git-dir="C:\Users\Asus\.gemini\antigravity\scratch\WebSite-Premium\.git" --work-tree="C:\Users\Asus\.gemini\antigravity\scratch\WebSite-Premium" push -u origin main --force
echo.
pause
goto MENU

:EXPLAIN_ALL
cls
echo ===============================================================================
echo                         WHERE IS EVERYTHING WRITTEN?
echo ===============================================================================
echo.
echo 1. MAIN FILE:
echo    C:\Project\WebSite\index.html
echo    - This single file contains your entire modern website!
echo    - Open it with any browser or text editor (Notepad, VS Code).
echo.
echo 2. YOUR PHOTO:
echo    C:\Project\WebSite\profile.jpg
echo    - This is your portrait photo, linked inside index.html.
echo.
echo 3. SECTIONS INCLUDED IN index.html:
echo    - Hero Section (Hi, I'm Dhruv Mishra + your photo)
echo    - About Me Section (GLA University student story + 6 focus areas)
echo    - Core Skills Section (AI/RAG, Backend, Frontend matrix)
echo    - Projects Section (CineSage AI & RAG Document Q&A)
echo    - Certifications Section (Microsoft Power BI, SQL, ML, Generative AI)
echo    - Architecture Simulator (Interactive prompt & schema inspector)
echo    - Contact Form & direct email / LinkedIn / GitHub links
echo.
echo ===============================================================================
pause
goto MENU

:EXIT_PROMPT
exit

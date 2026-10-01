@echo off
setlocal enabledelayedexpansion
echo ========================================================
echo   JanSakhi AI - Push to GitHub
echo   Target: https://github.com/subhash352006/jansakhi-ai
echo ========================================================
echo.

cd /d "%~dp0"
set "PATH=C:\Users\Kuppam Divakar Reddy\AppData\Local\Microsoft\WinGet\Packages\Git.MinGit_Microsoft.Winget.Source_8wekyb3d8bbwe\cmd;C:\Program Files\nodejs;%PATH%"

echo Checking git status...
git status
echo.

echo GitHub requires a Personal Access Token (PAT) for HTTPS pushes.
echo If you have a token, paste it below.
echo (Or press Enter to attempt standard push):
set /p TOKEN="Enter GitHub Token (or leave blank): "

if not "!TOKEN!"=="" (
    echo Pushing with provided token...
    git push https://subhash352006:!TOKEN!@github.com/subhash352006/jansakhi-ai.git main
) else (
    echo Pushing directly...
    git push -u origin main
)

if %ERRORLEVEL% equ 0 (
    echo.
    echo ========================================================
    echo  SUCCESS! JanSakhi AI pushed to GitHub:
    echo  https://github.com/subhash352006/jansakhi-ai
    echo ========================================================
) else (
    echo.
    echo ========================================================
    echo  Push encountered an error.
    echo  To create a GitHub Personal Access Token:
    echo  1. Open https://github.com/settings/tokens
    echo  2. Click 'Generate new token (classic)'
    echo  3. Select scope: 'repo' (Full control of private repositories)
    echo  4. Copy token and re-run this script or paste it in chat.
    echo ========================================================
)
echo.
pause

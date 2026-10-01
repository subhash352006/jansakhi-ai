@echo off
echo ===================================================
echo   JanSakhi AI - Push to GitHub (subhash352006)
echo ===================================================
echo.
cd /d "%~dp0"
set "PATH=%USERPROFILE%\AppData\Local\Programs\MinGit\cmd;C:\Program Files\nodejs;%PATH%"

echo 1. Verifying git repository...
git status
echo.
echo 2. Pushing to https://github.com/subhash352006/jansakhi-ai.git ...
git push -u origin main

if %ERRORLEVEL% equ 0 (
    echo.
    echo ===================================================
    echo  SUCCESS! JanSakhi AI pushed to GitHub:
    echo  https://github.com/subhash352006/jansakhi-ai
    echo ===================================================
) else (
    echo.
    echo ===================================================
    echo  If push failed, please make sure:
    echo  1. You created the repository 'jansakhi-ai' at https://github.com/new
    echo  2. You are signed into your GitHub account (subhash352006)
    echo ===================================================
)
pause

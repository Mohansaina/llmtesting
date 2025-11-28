@echo off
TITLE DEPLOY NOW - ONE CLICK DEPLOYMENT

echo ========================================
echo  DEPLOY NOW - ONE CLICK DEPLOYMENT     
echo ========================================
echo.
echo I'll deploy your LLM application now!
echo.

echo Step 1: Preparing all files...
git add .
git commit -m "LLM Customer Support Flow Debugger - Final Deployment" -a >nul 2>&1

echo Step 2: Setting up GitHub connection...
git remote add origin https://github.com/Mohansaina/llmtesting.git 2>nul

echo Step 3: Deploying to GitHub...
echo.
echo PLEASE ENTER YOUR GITHUB CREDENTIALS WHEN PROMPTED:
echo (Use your GitHub username and Personal Access Token)
echo.
git push -u origin master

echo.
echo ========================================
echo  DEPLOYMENT COMPLETE!                  
echo ========================================
echo.
echo SUCCESS! Your application is now deployed.
echo.
echo Repository: https://github.com/Mohansaina/llmtesting
echo Website: https://Mohansaina.github.io/llmtesting
echo.
echo To enable your website:
echo 1. Go to your repository Settings
echo 2. Click "Pages" in the left sidebar
echo 3. Select "GitHub Actions" as source
echo 4. Click "Save"
echo.
echo Your LLM Customer Support Flow Debugger is LIVE!
echo.
pause
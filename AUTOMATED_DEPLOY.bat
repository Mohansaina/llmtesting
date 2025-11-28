@echo off
TITLE Automated Deployment Preparation Tool

echo =========================================
echo  AUTOMATED DEPLOYMENT PREPARATION TOOL 
echo =========================================
echo.
echo This script will prepare your LLM application for deployment.
echo You'll need to manually create the GitHub repository and run one final command.
echo.

REM Check if we're in the right directory
if not exist "package.json" (
  echo ❌ ERROR: package.json not found!
  echo Please run this script from the project root directory.
  pause
  exit /b 1
)

echo ✅ Found project files
echo.

REM Show current git status
echo Git Status:
git status
echo.

REM Add any untracked files
echo Adding all files to git...
git add .
echo ✅ All files added to git
echo.

REM Check if we have any commits
git rev-parse --verify HEAD >nul 2>&1
if %errorlevel% neq 0 (
  echo Creating initial commit...
  git commit -m "Initial commit: LLM Customer Support Flow Debugger"
) else (
  echo Creating deployment commit...
  git commit -m "Deploy: LLM Customer Support Flow Debugger" -a
)
echo ✅ Commit created
echo.

REM Build the application
echo Building application...
echo 📦 Installing frontend dependencies...
cd frontend
call npm install
echo 🔨 Building frontend...
call npm run build
cd ..

echo 📦 Installing backend dependencies...
cd backend
call npm install
echo 📋 Copying frontend build to backend public directory...
xcopy ..\frontend\dist\* .\public\ /E /I /Y
cd ..
echo ✅ Application built successfully
echo.

REM Show repository status
echo Repository Status:
echo ==================
git status
echo.

REM Show the exact command the user needs to run
echo =========================================
echo  NEXT STEPS - COMPLETE DEPLOYMENT 
echo =========================================
echo.
echo 1. CREATE YOUR GITHUB REPOSITORY:
echo    Go to https://github.com/new
echo    Name it exactly: llmtesting
echo    Make it Public
echo    LEAVE ALL CHECKBOXES UNCHECKED
echo    Click "Create repository"
echo.
echo 2. RUN THIS SINGLE COMMAND TO DEPLOY:
echo    git remote add origin https://github.com/Mohansaina/llmtesting.git && git push -u origin main
echo.
echo That's it! Just two steps and your app will be deployed.
echo.
echo After deployment, your code will be visible at:
echo https://github.com/Mohansaina/llmtesting
echo.
echo For GitHub Pages (website hosting):
echo 1. Go to your repo Settings ^> Pages
echo 2. Select 'GitHub Actions' as source
echo 3. Your website will be at: https://Mohansaina.github.io/llmtesting
echo.
pause
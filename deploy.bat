@echo off
TITLE LLM Customer Support Flow Debugger Deployment

echo 🚀 Starting deployment process...

REM Check if we're in the right directory
if not exist "package.json" (
  echo ❌ Error: package.json not found. Please run this script from the project root directory.
  pause
  exit /b 1
)

echo ✅ Found project files

REM Install frontend dependencies
echo 📦 Installing frontend dependencies...
cd frontend
call npm install
if %errorlevel% neq 0 (
  echo ❌ Error: Failed to install frontend dependencies
  pause
  exit /b 1
)
echo ✅ Frontend dependencies installed

REM Build frontend
echo 🔨 Building frontend...
call npm run build
if %errorlevel% neq 0 (
  echo ❌ Error: Failed to build frontend
  pause
  exit /b 1
)
echo ✅ Frontend built successfully

REM Return to root directory
cd ..

REM Install backend dependencies
echo 📦 Installing backend dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
  echo ❌ Error: Failed to install backend dependencies
  pause
  exit /b 1
)
echo ✅ Backend dependencies installed

REM Copy built frontend files to public directory
echo 📋 Copying frontend build to backend public directory...
xcopy ..\frontend\dist\* .\public\ /E /I /Y
if %errorlevel% neq 0 (
  echo ❌ Error: Failed to copy frontend files
  pause
  exit /b 1
)
echo ✅ Frontend files copied to public directory

REM Return to root directory
cd ..

echo 🎉 Deployment preparation complete!
echo.
echo Next steps:
echo 1. Initialize git repository (if not already done):
echo    git init
echo    git add .
echo    git commit -m "Initial commit"
echo.
echo 2. Create a new repository on GitHub named 'llmtesting'
echo.
echo 3. Push to GitHub:
echo    git remote add origin https://github.com/Mohansaina/llmtesting.git
echo    git branch -M main
echo    git push -u origin main
echo.
echo 4. For GitHub Pages deployment:
echo    - Go to repository Settings ^> Pages
echo    - Select 'GitHub Actions' as source
echo.
echo 5. For full application deployment:
echo    - Deploy to Heroku, Render, or other Node.js hosting platform
echo    - Set OPENAI_API_KEY environment variable if using OpenAI mode
echo.
echo ✅ Your LLM Customer Support Flow Debugger is ready for deployment!
pause
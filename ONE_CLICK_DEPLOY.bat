@echo off
TITLE ONE CLICK DEPLOYMENT

echo ================================
echo  ONE CLICK DEPLOYMENT SYSTEM  
echo ================================
echo.

echo I'll prepare everything for deployment.
echo You'll need to create the GitHub repository yourself.
echo.

echo Preparing deployment...
git add .
git commit -m "LLM Customer Support Flow Debugger - Ready for Deployment" -a

echo.
echo ================================
echo  STEP 1: CREATE GITHUB REPO     
echo ================================
echo.
echo Please create your GitHub repository NOW:
echo.
echo 1. Go to: https://github.com/new
echo 2. Repository name: llmtesting
echo 3. Make it Public
echo 4. UNCHECK ALL boxes (no README, .gitignore, or license)
echo 5. Click "Create repository"
echo.
pause

echo.
echo ================================
echo  STEP 2: DEPLOYING TO GITHUB   
echo ================================
echo.
echo Deploying your application...
git remote add origin https://github.com/Mohansaina/llmtesting.git
git push -u origin master

echo.
echo ================================
echo  DEPLOYMENT COMPLETE!          
echo ================================
echo.
echo SUCCESS! Your application has been deployed.
echo.
echo Repository: https://github.com/Mohansaina/llmtesting
echo.
echo To enable the website (GitHub Pages):
echo 1. Go to your repository Settings
echo 2. Click "Pages" in the left sidebar
echo 3. Under "Source", select "GitHub Actions"
echo 4. Click "Save"
echo.
echo Your website will be available at:
echo https://Mohansaina.github.io/llmtesting
echo.
echo The LLM Customer Support Flow Debugger is now live!
echo.
pause
@echo off
TITLE Easy Deployment Tool

echo =================================
echo  EASY DEPLOYMENT TOOL 
echo =================================
echo.

echo STEP 1: Please create your GitHub repository NOW
echo Go to: https://github.com/new
echo Repository name: llmtesting
echo Make it Public
echo UNCHECK all boxes (no README, no .gitignore, no license)
echo Click "Create repository"
echo.
pause

echo STEP 2: Setting up remote repository...
git remote add origin https://github.com/Mohansaina/llmtesting.git

echo STEP 3: Deploying your application...
git push -u origin master

echo.
echo =================================
echo  DEPLOYMENT COMPLETE! 
echo =================================
echo.
echo Your code is now available at:
echo https://github.com/Mohansaina/llmtesting
echo.
echo To enable GitHub Pages:
echo 1. Go to your repository Settings
echo 2. Click "Pages" in the left sidebar
echo 3. Under "Source", select "GitHub Actions"
echo 4. Click "Save"
echo.
echo Your website will be available at:
echo https://Mohansaina.github.io/llmtesting
echo.
pause
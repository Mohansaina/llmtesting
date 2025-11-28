#!/bin/bash

# LLM Customer Support Flow Debugger Deployment Script

echo "🚀 Starting deployment process..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
  echo "❌ Error: package.json not found. Please run this script from the project root directory."
  exit 1
fi

echo "✅ Found project files"

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
npm install
if [ $? -ne 0 ]; then
  echo "❌ Error: Failed to install frontend dependencies"
  exit 1
fi
echo "✅ Frontend dependencies installed"

# Build frontend
echo "🔨 Building frontend..."
npm run build
if [ $? -ne 0 ]; then
  echo "❌ Error: Failed to build frontend"
  exit 1
fi
echo "✅ Frontend built successfully"

# Return to root directory
cd ..

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install
if [ $? -ne 0 ]; then
  echo "❌ Error: Failed to install backend dependencies"
  exit 1
fi
echo "✅ Backend dependencies installed"

# Copy built frontend files to public directory
echo "📋 Copying frontend build to backend public directory..."
cp -r ../frontend/dist/* ./public/
if [ $? -ne 0 ]; then
  echo "❌ Error: Failed to copy frontend files"
  exit 1
fi
echo "✅ Frontend files copied to public directory"

# Return to root directory
cd ..

echo "🎉 Deployment preparation complete!"
echo ""
echo "Next steps:"
echo "1. Initialize git repository (if not already done):"
echo "   git init"
echo "   git add ."
echo "   git commit -m \"Initial commit\""
echo ""
echo "2. Create a new repository on GitHub named 'llmtesting'"
echo ""
echo "3. Push to GitHub:"
echo "   git remote add origin https://github.com/Mohansaina/llmtesting.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "4. For GitHub Pages deployment:"
echo "   - Go to repository Settings > Pages"
echo "   - Select 'GitHub Actions' as source"
echo ""
echo "5. For full application deployment:"
echo "   - Deploy to Heroku, Render, or other Node.js hosting platform"
echo "   - Set OPENAI_API_KEY environment variable if using OpenAI mode"
echo ""
echo "✅ Your LLM Customer Support Flow Debugger is ready for deployment!"
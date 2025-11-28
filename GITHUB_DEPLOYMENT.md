# GitHub Deployment Guide

This guide will help you deploy the LLM Customer Support Flow Debugger to GitHub and host it using GitHub Pages or other hosting services.

## Steps to Deploy to GitHub

1. **Initialize Git Repository**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: LLM Customer Support Flow Debugger"
   ```

2. **Create GitHub Repository**:
   - Go to https://github.com/new
   - Create a new repository named `llmtesting`
   - Don't initialize with README, .gitignore, or license

3. **Push to GitHub**:
   ```bash
   git remote add origin https://github.com/Mohansaina/llmtesting.git
   git branch -M main
   git push -u origin main
   ```

## Hosting Options

### Option 1: GitHub Pages (Frontend Only)

If you only need the frontend with Mock LLM mode:

1. Build the frontend:
   ```bash
   cd frontend
   npm install
   npm run build
   ```

2. Create a `gh-pages` branch:
   ```bash
   git checkout -b gh-pages
   ```

3. Copy the built files to the root directory:
   ```bash
   cp -r dist/* .
   ```

4. Commit and push:
   ```bash
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin gh-pages
   ```

5. Enable GitHub Pages:
   - Go to your repository settings
   - Scroll to "Pages" section
   - Select "gh-pages" branch as source
   - Save

### Option 2: Full Application Deployment

For the complete application with backend:

1. Push the code to GitHub as described above
2. Use GitHub Actions for continuous deployment:
   - Create `.github/workflows/deploy.yml`
   - Configure for your preferred hosting platform (Heroku, Render, etc.)

### Option 3: Using GitHub Actions for Docker Deployment

Create `.github/workflows/docker-deploy.yml`:

```yaml
name: Deploy to Container Registry

on:
  push:
    branches: [ main ]

jobs:
  build-and-push:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Build Docker image
      run: docker build -t llm-debugger .
      
    - name: Login to GitHub Container Registry
      run: echo ${{ secrets.GITHUB_TOKEN }} | docker login ghcr.io -u ${{ github.actor }} --password-stdin
      
    - name: Tag and push image
      run: |
        docker tag llm-debugger ghcr.io/${{ github.repository_owner }}/llm-debugger:latest
        docker push ghcr.io/${{ github.repository_owner }}/llm-debugger:latest
```

## Environment Variables

For OpenAI integration, you'll need to set environment variables in your hosting platform:

- `OPENAI_API_KEY`: Your OpenAI API key

In GitHub Actions, you can set these as secrets in your repository settings.

## Post-Deployment

After deploying:

1. Test the application at your deployed URL
2. Verify all sections work correctly
3. Test both Mock and OpenAI modes (if API key is configured)
4. Check mobile responsiveness

## Updating the Deployment

To update your deployment:

1. Make changes to your code
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Description of changes"
   git push origin main
   ```
3. If using GitHub Pages, rebuild and push to gh-pages branch
4. If using CI/CD, the deployment will happen automatically
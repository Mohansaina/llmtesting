# Push to GitHub Instructions

Follow these steps to push this code to your GitHub repository:

## Step 1: Create a New Repository on GitHub

1. Go to https://github.com/new
2. Name your repository `llmtesting`
3. Make sure to leave all checkboxes unchecked (no README, no .gitignore, no license)
4. Click "Create repository"

## Step 2: Connect Your Local Repository to GitHub

Run these commands in your terminal:

```bash
git remote add origin https://github.com/Mohansaina/llmtesting.git
git branch -M main
git push -u origin main
```

## Step 3: Verify the Push

After pushing, you should see all files in your GitHub repository at:
https://github.com/Mohansaina/llmtesting

## Hosting Options

### Option 1: GitHub Pages (Frontend Only)

If you want to host just the frontend with Mock LLM mode:

1. Go to your repository settings on GitHub
2. Scroll down to the "Pages" section
3. Under "Source", select "GitHub Actions"
4. GitHub will automatically deploy your site

Alternatively, you can manually deploy to GitHub Pages:

1. Build the frontend:
   ```bash
   cd frontend
   npm install
   npm run build
   ```

2. Create a `gh-pages` branch and push the built files:
   ```bash
   git checkout -b gh-pages
   # Copy built files from frontend/dist to root
   cp -r frontend/dist/* .
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin gh-pages
   ```

3. Enable GitHub Pages in your repository settings

### Option 2: Full Application with Backend

For the complete application with backend functionality:

1. Use a cloud platform like:
   - Heroku
   - Render
   - AWS
   - Google Cloud Platform

2. Most platforms will automatically detect this is a Node.js application

## Environment Variables

If you want to enable OpenAI integration:

1. Get an OpenAI API key from https://platform.openai.com/
2. Add it as an environment variable in your hosting platform:
   - Variable name: `OPENAI_API_KEY`
   - Value: Your actual API key

## Post-Deployment Checklist

After deployment, verify that:

1. The homepage loads correctly
2. All navigation links work
3. The demo form submits and shows results
4. Both Mock and OpenAI modes function (if API key is configured)
5. The site is responsive on mobile devices

## Updating Your Deployment

To update your deployment after making changes:

1. Commit your changes:
   ```bash
   git add .
   git commit -m "Description of changes"
   ```

2. Push to GitHub:
   ```bash
   git push origin main
   ```

3. If using GitHub Pages, also push to the gh-pages branch:
   ```bash
   git push origin gh-pages
   ```